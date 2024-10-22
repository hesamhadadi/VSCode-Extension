import * as vscode from "vscode";

import { BookmarkTreeProvider } from "./provider/BookmarkTreeProvider";

export function activate(context: vscode.ExtensionContext) {
  const bookmarkTree = new BookmarkTreeProvider(context);

  context.subscriptions.push(
    ...[
      vscode.window.registerTreeDataProvider("qmark", bookmarkTree),
      vscode.commands.registerCommand("qmark.addItem", (args) => {
        bookmarkTree.addItem(vscode.Uri.parse(args.path));
      }),
      vscode.commands.registerCommand("qmark.removeItem", (args) => {
        bookmarkTree.deleteItem(args.resourceUri.path);
      }),
      vscode.commands.registerCommand("qmark.removeAllItems", () => {
        bookmarkTree.deleteAll();
      }),
      vscode.commands.registerCommand("qmark.refreshEntry", () => { 
        bookmarkTree.refresh();
      }),

      vscode.commands.registerCommand("qmark.openFile", (file) => {
        vscode.commands.executeCommand(
          "vscode.open",
          vscode.Uri.parse(file.resourceUri.path)
        );
      }),
    ]
  );
}

export function deactivate() { }
