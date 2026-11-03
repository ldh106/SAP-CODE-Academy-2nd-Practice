sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0221.controller.View1", {
         onInit() {
            let oModel = new JSONModel();
            oModel.loadData("../model/data.json");
            this.getView().setModel( oModel );
            let oModel2 = new JSONModel();
            oModel2.loadData("../model/data2.json");
            this.getView().setModel(oModel2, "model2");
        },
        onSelectEmp() {
            let oContext = this.getView().byId("tabEmp").getSelectedItem().getBindingContext();  //-> emps[선택한 요소의 인덱스]라는게 반환이 된당
            console.log(oContext);
            this.getView().byId("tabSkill").bindElement(oContext.getPath());
        }
    });
});