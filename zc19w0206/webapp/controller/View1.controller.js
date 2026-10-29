sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("ncode.zc19w0206.controller.View1", {
        onInit() {
            let obookData = {
                bookInfo: [    
                    {bookCode: "UX399", bookName: "Java Script", bookDate: "2", bookGrade: "L"},
                    {bookCode: "UX400", bookName: "SAPUI5", bookDate: "5", bookGrade: "M"},
                    {bookCode: "BC400", bookName: "ABAP Workbench", bookDate: "5", bookGrade: "M"},
                    {bookCode: "BC430", bookName: "ABAP Dictionary", bookDate: "3", bookGrade: "H"}]              
            };
            let oGradeData = {
                gradeInfo: [
                    {key: "L", text: "하"},
                    {key:"M", text:"중"},
                    {key:"H", text:"상"}
                ]
            };
            let oBookModel = new JSONModel();
            oBookModel.setData(obookData);
            this.getView().setModel(oBookModel, "bookM");

            let oGradeModel = new JSONModel();
            oGradeModel.setData(oGradeData);
            this.getView().setModel(oGradeModel, "gradeM");

            let bData = {};
            let bModel = new JSONModel();
            bModel.setData(bData);
            this.getView().setModel(bModel, "bookModel");            
            
        },
        // onSelect(oEvent){                    
        //     let oView = this.getView();
        //     let oItem = oEvent.getParameter("selectedItem");            
        //     let oContext = oItem.getBindingContext();            
        //     let bCode = oView.getModel().getProperty("bookCode", oContext);
        //     let bName = oView.getModel().getProperty("bookName", oContext);
        //     let bDate = oView.getModel().getProperty("bookDate", oContext);
        //     oView.byId("inpBCode").setValue(bCode);
        //     oView.byId("inpBName").setValue(bName);
        //     oView.byId("inpBDate").setValue(bDate);
        // }
        onSearch(){
            let oView = this.getView();            
            let oBookItem = oView.byId("cbBook").getSelectedItem();
            if (!oBookItem) { return; }
            let oItem = oBookItem.getBindingContext("bookM")
            console.log(oItem);
            let oData = oItem.getObject();
            oView.getModel("bookModel").setData(oData);            
            oView.byId("cbGrade").setSelectedKey(oData.bookGrade);
            oView.byId("pnInfo").bindElement()                        
        }
    });
});