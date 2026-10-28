sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0205.controller.View1", {
        onInit() {
            let sl = [
                    {sCode: "S10001", sName: "SAPUI5"}, 
                    {sCode: "S20001", sName: "ABAP"}
                ];
            let oData = {
                selectedScode: sl[0].sCode,
                skillList: sl
            };

            let oModel = new JSONModel();
            oModel.setData(oData);
            let oView = this.getView();
            oView.setModel(oModel);
        },
        onSearch(){
            let oView = this.getView();
            let oCbSkill = oView.byId("cbSkill");
        },
        onSelect(oEvent){
            console.log(oEvent);
            let oItem = oEvent.getParameter("selectedItem");
            let oContext = oItem.getBindingContext(); //object임
            let sPath = oContext.getPath();
            let sCode = this.getView().getModel().getProperty("sCode", oContext);            
            // alert(this.getView().getModel().selectedScode);
        }
    });
});