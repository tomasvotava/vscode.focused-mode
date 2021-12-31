// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

var focusedMode = false;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const startFocusedMode = () => {
  if (focusedMode) {
    vscode.window.showWarningMessage("Focused mode is already on");
    return;
  }
  vscode.commands.executeCommand("workbench.action.toggleFullScreen");
  vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility");
  vscode.commands.executeCommand("workbench.action.minimizeOtherEditors");
  vscode.commands.executeCommand("editor.action.fontZoomIn");
  focusedMode = true;
};

const leaveFocusedMode = () => {
  if (!focusedMode) {
    vscode.window.showWarningMessage("Focused mode is not on");
    return;
  }
  vscode.commands.executeCommand("workbench.action.toggleFullScreen");
  vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility");
  vscode.commands.executeCommand("editor.action.fontZoomReset");
  focusedMode = false;
};

const toggleFocusedMode = () => {
  if (focusedMode) return leaveFocusedMode();
  startFocusedMode();
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "focused-mode.startFocusedMode",
    startFocusedMode
  );

  let disposableOffToggle = vscode.commands.registerCommand(
    "focused-mode.leaveFocusedMode",
    leaveFocusedMode
  );

  let disposableToggle = vscode.commands.registerCommand(
    "focused-mode.toggleFocusedMode",
    toggleFocusedMode
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposableOffToggle);
  context.subscriptions.push(disposableToggle);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
