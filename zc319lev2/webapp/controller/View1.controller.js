sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
	"sap/ui/model/Sorter"
], (Controller,
	JSONModel,
	Filter,
	MessageBox,
	Sorter) => {
    "use strict";

    return Controller.extend("ncode.zc319lev2.controller.View1", {
        onInit() {
            //변수선언
            let oView = this.getView();
            let oStdModel = new JSONModel();
            let oGroupModel = new JSONModel();
            let oCbClass = oView.byId("idClassListComboBox");           //반 정보가 담겨있는 콤보박스
            let oCbGroup = oView.byId("idGroupListComboBox");           //조 정보가 담겨있는 콤보박스
            let sSelectedClassKey = oCbClass.getSelectedKey();          //반 정보가 담겨있는 콤보박스에서 선택한 key
            let sSelectedGroupKey = oCbGroup.getSelectedKey();          //조 정보가 담겨있는 콤보박스에서 선택한 key
            let oTabStd = oView.byId("idEsStdListTable");            
            //학생의 정보가 들어있는 mInfo 세컨드리 모델과 조 정보가 들어있는 gInfo 세컨드리 모델 선언
            oStdModel.loadData("../model/data2Lev.json");
            oGroupModel.loadData("../model/groupData2Lev.json");
            oView.setModel(oStdModel, "mInfo");
            oView.setModel(oGroupModel, "gInfo");            
            //필터의 규칙 설정
            let oClassFilter = new Filter("cId" , "EQ", sSelectedClassKey);
            let oGroupFilter = new Filter("sGroup", "EQ", sSelectedGroupKey);
            //filter안에 배열을 넣어서 oClassFilter와 oGroupFilter를 모두 적용시킴
            oTabStd.getBinding("items").filter([oClassFilter, oGroupFilter]);            

        },
        //소속된 반 정보를 바꿨을 때
        onClassListComboBoxSelectionChange(oEvt){
            let oView = this.getView()
            let oTabStd = oView.byId("idEsStdListTable");                       //테이블 정보
            let oParameter = oEvt.getParameter("selectedItem");                 //선택된 아이템의 Parameter
            if(!oParameter){                                                    //소속된 group의 정보를 지웠을 때 class 으로만 filter를 적용함
                let oCbGroup = oView.byId("idGroupListComboBox");               //조 정보가 담겨있는 콤보박스
                let sSelectedGroupKey = oCbGroup.getSelectedKey();              //조 정보가 담겨있는 콤보박스가 선택한 key
                let oGroupFilter = new Filter("sGroup", "EQ", sSelectedGroupKey);
                oTabStd.getBinding("items").filter(oGroupFilter);       //전체 반에 대한 그룹(ex. 모든 반의 2조)을 보고싶기 때문에, 필터를 Group만 적용함
            }else{                                                          //소속된 group의 정보를 지웠을 때 sSelectedGroupKey가 ""로 나오는것을 확인해 조건문에 추가함.
                let oContext = oParameter.getBindingContext("mInfo");       //선텍된 아이템이 학생전체정보 모델에서 갖고있는 BindingContext
                let oStdModel = oView.getModel("mInfo");                    //학생전체정보 모델 정보
                let sSelectedClassKey = oStdModel.getProperty("cId", oContext); //선택된 아이템 정보의 BindingContext에서 cId 속성의 값을 받아옴
                let oCbGroup = oView.byId("idGroupListComboBox");               //조 정보가 담겨있는 콤보박스
                let sSelectedGroupKey = oCbGroup.getSelectedKey();              //조 정보가 담겨있는 콤보박스가 선택한 key
                //필터조건 설정
                let oClassFilter = new Filter("cId", "EQ", sSelectedClassKey);            
                let oGroupFilter = new Filter("sGroup", "EQ", sSelectedGroupKey);
                //조회조건 설정                        
                if((sSelectedClassKey == "0" || sSelectedClassKey == "") && (sSelectedGroupKey == "0" || sSelectedGroupKey == "")){
                    oTabStd.getBinding("items").filter();                   //필터 안의 파라미터를 비워서 필터를 초기화시킴
                }            
                else if(sSelectedClassKey == "0" || sSelectedClassKey == ""){
                    oTabStd.getBinding("items").filter(oGroupFilter);       //전체 반에 대한 그룹(ex. 모든 반의 2조)을 보고싶기 때문에, 필터를 Group만 적용함
                }else if(sSelectedGroupKey == "0" || sSelectedGroupKey == ""){
                    oTabStd.getBinding("items").filter(oClassFilter);       //그룹 필터링 없이 반 전체의 정보를 보고싶기 때문에, 필터를 Class만 적용함
                }
                else {
                    oTabStd.getBinding("items").filter([oClassFilter, oGroupFilter]);           //사용자가 원하는 반의 조를 전부 필터링함
                }
            }                    
        },
        //소속된 조 정보를 바꿨을 때
        onGroupListComboBoxSelectionChange(oEvt){
            let oView = this.getView()
            let oTabStd = oView.byId("idEsStdListTable");                       //테이블 정보
            let oParameter = oEvt.getParameter("selectedItem");                 //선택된 아이템의 Parameter
            if(!oParameter) {                                                   //소속된 반의 정보를 지웠을 때 group 으로만 filter를 적용함
                let oCbClass = oView.byId("idClassListComboBox");                   //반 선택 콤보박스 정보
                let sSelectedClassKey = oCbClass.getSelectedKey();                  //반 선택 콤보박스가 선택한 key
                let oClassFilter = new Filter("cId", "EQ", sSelectedClassKey);
                oTabStd.getBinding("items").filter(oClassFilter);   //그룹 필터링 없이 반 전체의 정보를 보고싶기 때문에, 필터를 Class만 적용함
            }else{                                                              //소속된 반의 정보를 지웠을 때 sSelectedClassKey가 ""로 나오는것을 확인해 조건문에 추가함.
                let oContext = oParameter.getBindingContext("gInfo");               //group 모델에서 선택된 아이템의 BindingContext
                let oStdModel = oView.getModel("gInfo");                            //group 모델 정보
                let sSelectedGroupKey = oStdModel.getProperty("id", oContext);      //선택된 아이템 정보의 BindingContext를 통해 id 속성의 값을 가져옴
                let oCbClass = oView.byId("idClassListComboBox");                   //반 선택 콤보박스 정보
                let sSelectedClassKey = oCbClass.getSelectedKey();                  //반 선택 콤보박스가 선택한 key
                //필터조건 설정
                let oClassFilter = new Filter("cId", "EQ", sSelectedClassKey);
                let oGroupFilter = new Filter("sGroup", "EQ", sSelectedGroupKey);    
                //조회하고자 하는 반/조의 정보가 전체 반 / 전체 조 일 때                             
                if((sSelectedClassKey == "0" || sSelectedClassKey == "") && (sSelectedGroupKey == "0" || sSelectedGroupKey == "")){     
                    oTabStd.getBinding("items").filter();               //필터 안의 파라미터를 비워서 필터를 초기화시킴
                }
                else if(sSelectedClassKey == "0" || sSelectedClassKey == ""){
                    oTabStd.getBinding("items").filter(oGroupFilter);   //전체 반에 대한 그룹(ex. 모든 반의 2조)을 보고싶기 때문에, 필터를 Group만 적용함
                }else if(sSelectedGroupKey == "0" || sSelectedGroupKey == ""){
                    oTabStd.getBinding("items").filter(oClassFilter);   //그룹 필터링 없이 반 전체의 정보를 보고싶기 때문에, 필터를 Class만 적용함
                }
                else {
                    oTabStd.getBinding("items").filter([oClassFilter, oGroupFilter]);   //사용자가 원하는 반의 조를 전부 필터링함
                }      
            }
            
        },
        onTableSelectionChange(oEvt){
            let oView = this.getView();
            let oTabStd = oView.byId("idEsStdListTable");                       //테이블 정보
            let oParameter = oEvt.getParameter("listItem");                     //선택된 아이템의 Parameter
            let sPath = oParameter.getBindingContext("mInfo").getPath();
            let oStdModel = oView.getModel("mInfo");
            //패널에 bindElement를 통해 선택한 학생의 경로로 지정함.
            //조 정보는 gInfo에서 조장 정보는 새로운 세컨드리 모델에서 가져오려고 했으나, 방법이 여의치 않아 조 정보는 바인딩 경로 뒤에 "조"를 붙이고,
            //조장 정보는 switch문을 통해 L / S / N 일때만 구분함.
            oView.byId("panDetail").bindElement("mInfo>" + sPath);              
            let oContext = oParameter.getBindingContext("mInfo");
            let sLeaderId = oStdModel.getProperty("sLeader", oContext);
            switch(sLeaderId){
                case "L":
                    oView.byId("inpSLeader").setDescription("조장");
                    break;
                case "S":
                    oView.byId("inpSLeader").setDescription("부조장");
                    break;
                case "N":
                    oView.byId("inpSLeader").setDescription("조원");
                    break;
            }
            if(oStdModel.getProperty("sMajor", oContext) == "Y"){
                oView.byId("chkMajor").setSelected(true);
            }else{
                oView.byId("chkMajor").setSelected(false);
            }
            oView.byId("panDetail").setExpanded(true);          //학생 클릭과 동시에 패널이 펴짐.
            // 조장/부조장/조원 여부를 모델을 만들어서 시도해보려고 했으나, L/S/N 까지는 잘 가져오지만, 그걸 모델에서 경로정보 없이 어떻게 조회할지 정확히 기억이 나질 않아서 시도하지 못했습니다.
            // let oLeaderData = { 
            //     LeaderList: [
            //         {id: "L", name: "조장"},
            //         {id:"S", name:"부조장"},
            //         {id:"N", name:"조원"}
            //     ]
            // };
            // let oLeaderModel = new JSONModel()
            // oLeaderModel.setData(oLeaderData);                                    
            // let sLeaderName = oLeaderModel.getProperty(sLeaderId);            
        }
    });
});