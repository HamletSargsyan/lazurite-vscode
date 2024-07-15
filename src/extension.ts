import * as vscode from 'vscode';

async function runFile() {
  const editor = vscode.window.activeTextEditor

  if (!editor) {
    vscode.window.showErrorMessage('No active editor found.');
    return
  }

  const configuration = vscode.workspace.getConfiguration('lazurite');
  let jarPath = configuration.get<string>('jarPath');

  const filePath = editor.document.fileName;
  if (!jarPath) {
    jarPath = await vscode.window.showInputBox({
      prompt: 'Enter lazurite jar path',
      placeHolder: 'Lazurite jar path'
    });



    if (!jarPath) {
      vscode.window.showErrorMessage('Lazurite jar path is undefined');
      return;
    }
    configuration.update("jarPath", jarPath)
  }


  if (vscode.window.activeTerminal) {
    var terminal = vscode.window.activeTerminal;
  } else {
    var terminal = vscode.window.createTerminal(`Run ${jarPath}`);
  }
  terminal.sendText(`java -jar ${jarPath} -r ${filePath}`);
  terminal.show();

}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('lazurite.runFile', runFile);

  context.subscriptions.push(disposable);
}

export function deactivate() { }
