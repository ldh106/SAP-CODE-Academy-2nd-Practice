sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("ncode.zc19w0106.controller.View1", {
        onInit() {
        },
        onClick: function(){
        let oView = this.getView();
        let oStudentCode = oView.byId("inpStudentCode");
        let oStudentClass = oView.byId("inpStudentClass");
        let oStudentTeam = oView.byId("inpStudentTeam");
        let oStudentFirstName = oView.byId("inpStudentFirstName");
        let oStudentLastName = oView.byId("inpStudentLastName");
        let oChkLeader = oView.byId("chkLeader")
        let SC = oStudentCode.getValue();
        if(SC == "S3519"){
            oStudentClass.setValue("3반");
            oStudentTeam.setValue("5조");
            oStudentLastName.setValue("임");
            oStudentFirstName.setValue("동한");
            oChkLeader.setText("부조장");
            oChkLeader.setSelected(true);
        }else{
            oStudentClass.setValue("");
            oStudentTeam.setValue("");
            oStudentLastName.setValue("");
            oStudentFirstName.setValue("");
            oChkLeader.setText("조장");
            oChkLeader.setSelected(false);
            MessageBox.show(SC + "학생번호는 현재 알 수 없습니다.", {
                title: "Error"
            });            
        }
      }
    });
});