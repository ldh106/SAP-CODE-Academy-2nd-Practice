sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0203.controller.View1", {
        onInit() {
            let oData = {
                bookInfo: {
                    code: "UX400",
                    name: "SAPUI5"
                },
                empName: "강석권"
            };
            let oModel = new sap.ui.model.json.JSONModel();
            oModel.setData(oData);
            this.getView().setModel(oModel);

            let oDataEmp = {
                empName: "홍길동"
            };
            let oModelEmp = new JSONModel();
            oModelEmp.setData(oDataEmp);
            this.getView().setModel(oModelEmp, "empModel");
        },
        onPress(){
            let oView = this.getView();
            let oModel = oView.getModel("empModel");
            let oDataBook = oModel.getData();
            alert(oDataBook.empName);
        }
    });
});