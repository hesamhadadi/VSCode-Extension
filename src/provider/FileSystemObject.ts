import * as vscode from "vscode";

export class FileSystemObject extends vscode.TreeItem {
  resourceUri: vscode.Uri;
  command: vscode.Command;

  constructor(public readonly label: string, uri: vscode.Uri) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.tooltip = uri.fsPath;
    this.resourceUri = uri;
    this.command = {
      arguments: [this],
      command: "qmark.openFile",
      title: this.label,
    };
  }
}
