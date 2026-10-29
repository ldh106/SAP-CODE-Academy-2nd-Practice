sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0209.controller.View1", {
        onInit() {
            let oEduData = {
                edus: [
                    {"eCode": "ITTP", "eduName": "혁신성장", "classCnt": "10", "totStd": 250},
                    {"eCode": "SYNC", "eduName": "혁신성장", "classCnt": "10", "totStd": 250}
                ]
            };
            let oEduModel = new JSONModel();
            oEduModel.setData(oEduData);
            this.getView().setModel(oEduModel);
        }
    });
});