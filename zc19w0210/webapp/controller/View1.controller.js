sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
], (Controller, JSONModel, Filter) => {
    "use strict";

    return Controller.extend("ncode.zc19w0210.controller.View1", {
        onInit() {
            let oModel = new JSONModel();
            oModel.loadData("../model/data.json");
            this.getView().setModel(oModel, "mInfo");
            let rModel = new JSONModel({});
            this.getView().setModel(rModel, "rInfo")
        },
        onSearch(){
            let oView = this.getView();
            let sCmbKey = oView.byId("cmbSkill").getSelectedKey();

            let oTableSkl = oView.byId("tabSkill");
            let oFilter = new Filter(
                "sLevel", "EQ", sCmbKey
            );            
            oTableSkl.getBinding("items").filter(oFilter);            
        },        
        onChange(oEvt){
            let oView = this.getView();
            let oCbRst = oView.byId("tabRst");
            let oPara = oEvt.getParameter("listItem");
            let oContext = oPara.getBindingContext("mInfo");            
            // let sPath = oContext.getPath();
            let oItem = oContext.getObject(); 
            //객체를 복사할 수 있는건 없나요? oItem <-> mInfo간의 two-way 통신이라 rst값이 바뀌면 원본 데이터도 바뀔 것 같습니다.          
            let oModel = oView.getModel("mInfo");
            oModel.setProperty("/rst", [oItem]);            
        }
    });
});