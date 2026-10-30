sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0220.controller.View1", {
        onInit() {
            let oData = {
                inpDate: "2026.10.30",
                picDate: new Date(),
                totCnt: 1000,
                sPrice: 1000,
                waers: "KRW"
            };
            let oModel = new JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel)
        },
        onClick(){
            // let sDateTest = new Date();
            // console.log(sDateTest)
            // let oView = this.getView();
            // let sDate = oView.byId("inpDate").getValue();
            // sDate = oView.byId("picDate").getValue();
            // alert(sDate);
            let oDataInfo = this.getView().getModel().getData();
            console.log(oDataInfo.totCnt);
            console.log(this.byId("inpCnt").getValue());
        }
    });
});