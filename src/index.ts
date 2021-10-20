import * as vscode from 'vscode';
import { GitExtension } from './types/git';

var sprTerminal: vscode.Terminal | null = null;
const terminalName = "GIT SPR";

export function activate(context: vscode.ExtensionContext) {
	function getGitExtension() {1
		const vscodeGit = vscode.extensions.getExtension<GitExtension>('vscode.git');
		const gitExtension = vscodeGit && vscodeGit.exports;
		return gitExtension;
	}

	const gitExtension = getGitExtension();
	if (!gitExtension?.enabled) {
		vscode.window.showErrorMessage('Git extensions are not currently enabled, please try again after enabled!');
		return false;
	}
	let repo: any = gitExtension.getAPI(1).repositories[0];

	vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
		if (terminal.name === terminalName) sprTerminal = terminal
	});

	vscode.window.onDidCloseTerminal((terminal: vscode.Terminal) => {
		if (terminal.name === terminalName) sprTerminal = null;
	});

	context.subscriptions.push(vscode.commands.registerCommand('vscodeGitSpr.Merge', () => {
		if (sprTerminal === null) sprTerminal = vscode.window.createTerminal(terminalName);
		sprTerminal.sendText("git-spr merge");
		sprTerminal.show(true);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscodeGitSpr.Update', () => {
		if (sprTerminal === null) sprTerminal = vscode.window.createTerminal(terminalName);
		sprTerminal.sendText("git-spr update");
		sprTerminal.show(true);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscodeGitSpr.Status', () => {
		if (sprTerminal === null) sprTerminal = vscode.window.createTerminal(terminalName);
		sprTerminal.sendText("git-spr status");
		sprTerminal.show(true);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscodeGitSpr.Amend', () => {
		if (sprTerminal === null) sprTerminal = vscode.window.createTerminal(terminalName);
		sprTerminal.sendText("git amend");
		sprTerminal.show(true);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vscodeGitSpr.Rebase', () => {
		if (sprTerminal === null) sprTerminal = vscode.window.createTerminal(terminalName);
		sprTerminal.sendText("git rebase");
		sprTerminal.show(true);
	}));
}