import * as path from "path";
import * as vscode from "vscode";

import { FileSystemObject } from "./FileSystemObject";

export class BookmarkTreeProvider
  implements vscode.TreeDataProvider<FileSystemObject> {
  private items: vscode.Uri[] = [];
  private context: vscode.ExtensionContext;
  private _onDidChangeTreeData: vscode.EventEmitter<FileSystemObject | undefined | null | void> = new vscode.EventEmitter<FileSystemObject | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<FileSystemObject | undefined | null | void> = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.items = this.context.workspaceState.get('qmarkItems') || [];
  }

  getTreeItem(element: FileSystemObject): FileSystemObject | Thenable<FileSystemObject> {
    return element;
  }

  getChildren(element?: FileSystemObject | undefined): vscode.ProviderResult<FileSystemObject[]> {
    if (element) {
      return [];
    }

    return this.items.map(uri => new FileSystemObject(path.basename(uri.path), uri));
  }

  addItem(uri: vscode.Uri) {
    this.items.push(uri);
    this.saveItems();
    this.refresh();
  }

  deleteItem(path: string) {
    this.items = this.items.filter(uri => uri.path !== path);
    this.saveItems();
    this.refresh();
  }

  deleteAll() {
    this.items = [];
    this.saveItems();
    this.refresh();
  }

  private saveItems() {
    this.context.workspaceState.update("qmarkItems", this.items);
  }
}
