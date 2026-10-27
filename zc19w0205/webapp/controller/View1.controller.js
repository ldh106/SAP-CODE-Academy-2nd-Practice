sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0205.controller.View1", {
        onInit() {
            let oData = {
                skillList: [
                    {sCode: "S1001", sName: "SAPUI5"}, 
                    {sCode: "S2001", sName: "ABAP"}
                ]
            };

            let oModel = new JSONModel();
            oModel.setData(oData);
            let oView = this.getView();
            oView.setModel(oModel);
        }
    });
});