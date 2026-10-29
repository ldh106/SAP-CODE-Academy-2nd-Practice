sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0208.controller.View1", {
        onInit() {
            let oModel = new JSONModel();
            oModel.loadData("../model/data.json");
            this.getView().setModel(oModel, "stdInfo");
        },
        onGetInfo(){
            let oView = this.getView();
            let oCbStd = oView.byId("cbStd");
            let oCbSkl = oView.byId("cbSkl");
            let oItem = oCbStd.getSelectedItem()
            if(!oItem) {  return;  }
            let oPath = oItem.getBindingContext("stdInfo").getPath();
            alert(oPath);
            oCbSkl.bindElement("stdInfo>" + oPath);
        }
    });
});