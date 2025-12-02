#!/usr/bin/env node
'use strict';

const path = require('node:path');
const fs = require('node:fs');
const { spawnSync } = require('node:child_process');

const pnpmInvocation = resolvePnpmInvocation();
const rootDir = findRepoRoot(__dirname);
const homeDir = path.join(rootDir, 'apps', 'home');
const docsDir = path.join(rootDir, 'apps', 'docs');
const rootDistDir = path.join(rootDir, 'dist');
const homeDistDir = path.join(homeDir, 'dist');
const docsDistDir = path.join(docsDir, '.vitepress', 'dist');

function runPnpm(args, cwd) {
  console.log(`\n> pnpm ${args.join(' ')}`);
  console.log(`  cwd: ${cwd}`);
  const commandArgs = pnpmInvocation.args.concat(args);
  const result = spawnSync(pnpmInvocation.command, commandArgs, { stdio: 'inherit', cwd });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`命令执行失败: pnpm ${args.join(' ')} (退出码 ${result.status})`);
  }
}

function ensureCleanDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`路径不存在: ${src}`);
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const linkTarget = fs.readlinkSync(srcPath);
      fs.symlinkSync(linkTarget, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function assertExists(targetPath, label) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`${label} 不存在: ${targetPath}`);
  }
}

function ensureDependencies(dir) {
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return;
  }
  const nodeModulesPath = path.join(dir, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    return;
  }
  console.log(`\n检测到 ${dir} 缺少 node_modules，自动安装依赖...`);
  runPnpm(['install'], dir);
}

function resolvePnpmInvocation() {
  const execPath = process.env.npm_execpath;
  if (execPath && fs.existsSync(execPath)) {
    return { command: process.execPath, args: [execPath] };
  }
  const pnpmBin = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  return { command: pnpmBin, args: [] };
}

function findRepoRoot(startDir) {
  let current = path.resolve(startDir);
  while (true) {
    const appsPath = path.join(current, 'apps');
    const scriptsPath = path.join(current, 'scripts');
    if (fs.existsSync(appsPath) && fs.existsSync(scriptsPath)) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error('无法定位项目根目录');
    }
    current = parent;
  }
}

function main() {
  ensureDependencies(homeDir);
  ensureDependencies(docsDir);
  runPnpm(['run', 'build'], homeDir);
  runPnpm(['run', 'docs:build'], docsDir);

  ensureCleanDir(rootDistDir);

  assertExists(homeDistDir, 'home 构建产物');
  copyDir(homeDistDir, rootDistDir);

  assertExists(docsDistDir, 'docs 构建产物');
  copyDir(docsDistDir, path.join(rootDistDir, 'docs'));

  console.log('\n构建完成，dist 目录已更新。');
}

try {
  main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
