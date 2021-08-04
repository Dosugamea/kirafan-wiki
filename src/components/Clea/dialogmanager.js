class CleaDialogContext{
  constructor(text,autoDismiss,optionList,priority,dismissCallback,selectOptionCallback){
    this.text=text;
    this.autoDismiss = autoDismiss;
    this.optionList=optionList;
    this.dismissCallback=dismissCallback;
    this.selectOptionCallback=selectOptionCallback;
    this.priority = priority;
  }
}

export class DialogManager{
  constructor(){
    this.dialogOpen = false;
    this.dialogAutoDismiss = true;
    this.dialogQueue = [];
    this.dialogText = '';
    this.dialogOptionList = [];
    this.dialogDismissCallback = null;
    this.dialogSlectOptionCallback = null;
    this.dialogPriority = DialogContextPriority.None;
  }

  /**
   * push text to dialog box
   * @param {string} text chat content
   * @param {object|null} optionList Q&A answer list
   * @param {number} priority DialogContextPriority: None: 0, Idle: 1, Normal: 2, Force: 3,
   * @param {boolean|null} autoDismiss auto dismiss chat, default true
   * @param {function|null} dismissCallback callback func
   * @param {function} selectOptionCallback callback func for Q&A answer list
   */
  pushDialog(text, optionList = null, priority = DialogContextPriority.Normal, autoDismiss = true, dismissCallback = null, selectOptionCallback = null) {
    if (this.dialogOpen && priority == DialogContextPriority.Idle && this.dialogPriority > priority) {
      //cancel the dialog;
      if (isFunction(dismissCallback)) {
        dismissCallback();
      }
      return;
    }

    this.dialogQueue.push(new CleaDialogContext(text, autoDismiss, optionList, priority, dismissCallback, selectOptionCallback));
    if (this.dialogQueue.length == 1) {
      if (this.dialogOpen) {
        if (priority == DialogContextPriority.Force || //force take over
          priority > this.dialogPriority || //high priority take over
          (priority == DialogContextPriority.Idle && this.dialogPriority == priority)) { //idle replace
          this.onShowChange(false);
          this.applyDialog();
        }
      } else {
        this.applyDialog();
      }
    } else if (priority == DialogContextPriority.Force) {
      this.onShowChange(false);
      this.applyDialog();
    }
  }

  clearDialog(){
    this.dialogQueue = [];
  }

  applyDialog(){
    if(this.dialogQueue.length > 0){
      let c = this.dialogQueue.pop();
      this.dialogText = c.text;
      this.dialogOptionList = c.optionList;
      this.dialogPriority = c.priority;
      this.dialogAutoDismiss = c.autoDismiss;
      this.dialogDismissCallback = c.dismissCallback;
      this.dialogSlectOptionCallback = c.selectOptionCallback;
      this.dialogOpen = true;
    }
  }

  onShowChange(val){
    if(!val){
      this.dialogOpen = false;
      if(isFunction(this.dialogDismissCallback)){
        this.dialogDismissCallback();
      }
      this.applyDialog();
    }
  }

  onSelection(i){
    if(isFunction(this.dialogSlectOptionCallback)){
      this.dialogSlectOptionCallback(i);
    }
    this.onShowChange(false);
  }

}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export const DialogContextPriority = {
  None : 0,
  Idle : 1,
  Normal : 2,
  Force : 3,
};

export const DialogManagerInstance = new DialogManager();
