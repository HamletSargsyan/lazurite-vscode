import * as vscode from 'vscode';
import * as commands from './commands';


export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('lazurite.runFile', commands.runFile);
  context.subscriptions.push(disposable);
}

export function deactivate() { }
