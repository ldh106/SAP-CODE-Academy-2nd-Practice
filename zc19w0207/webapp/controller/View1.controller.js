sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0207.controller.View1", {
        onInit() {
            // const oData = {
            //     empInfo: {lastName: "강", firstName: "석권"},
            //     stdInfo: {lastName: "임", firstName: "동한"}
            // };
            let oModel = new JSONModel();
            oModel.loadData("../model/data.JSON");
            this.getView().setModel(oModel);
        },
        onGetEmpInfo(){
            let oPanel = this.getView().byId("pnEmp");
            oPanel.bindElement("/empInfo");
            // console.log(oPage);
        },
        onGetStdInfo(){
            let oPanel = this.getView().byId("pnStd");
            oPanel.bindElement("/stdInfo");
        }
    });
});