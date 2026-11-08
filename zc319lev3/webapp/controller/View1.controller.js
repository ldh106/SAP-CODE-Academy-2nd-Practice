sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
	"sap/ui/model/Sorter",
    "sap/ui/core/Fragment"
], (Controller,
	JSONModel,
	Filter,
	MessageBox,
	Sorter,
    Fragment) => {
    "use strict";

    return Controller.extend("ncode.zc319lev3.controller.View1", {
        onInit() {
            //변수선언
            let oView = this.getView();
            let oStdModel = new JSONModel();
            let oGroupModel = new JSONModel();
            let oCmbClass = oView.byId("cmbClass");                      //반 정보가 담겨있는 콤보박스
            let oCmbGroup = oView.byId("cmbGroup");                      //조 정보가 담겨있는 콤보박스
            let sSelectedClassKey = oCmbClass.getSelectedKey();          //반 정보가 담겨있는 콤보박스에서 선택한 key
            let sSelectedGroupKey = oCmbGroup.getSelectedKey();          //조 정보가 담겨있는 콤보박스에서 선택한 key
            let oTabStd = oView.byId("tabStd");            
            //학생의 정보가 들어있는 mInfo 세컨드리 모델과 조 정보가 들어있는 gInfo 세컨드리 모델 선언
            oStdModel.loadData("../model/data4Lev.json");
            oGroupModel.loadData("../model/groupData4Lev.json");
            oView.setModel(oStdModel, "mInfo");
            oView.setModel(oGroupModel, "gInfo");            
            //필터의 규칙 설정
            let oClassFilter = new Filter("cId" , "EQ", sSelectedClassKey);
            let oGroupFilter = new Filter("sGroup", "EQ", sSelectedGroupKey);
            //filter안에 배열을 넣어서 oClassFilter와 oGroupFilter를 모두 적용시킴
            oTabStd.getBinding("items").filter([oClassFilter, oGroupFilter]);            

        },
        //소속된 반 정보를 바꿨을 때 -> 기능상 반 정보를 콤보박스에서 바꾸면 너무 자주 바뀔 것 같고, 사용자가 원하지 않을 것 같아서 그룹 정보를 바꿨을 때만
        // 기능이 작동하게 하기 위해서 반 콤보박스를 지웠을 때에 모든 반에대한 조의 정보가 나오는 것을 제외하고 모든 기능을 삭제함.
        onClassSelectionChange(oEvt){
            let oView = this.getView()
            let oTabStd = oView.byId("tabStd");                   //테이블 정보
            let oParameter = oEvt.getParameter("selectedItem");             //선택된 아이템의 Parameter
            let oCmbGroup = oView.byId("cmbGroup");                          //조 정보가 담겨있는 콤보박스
            let sSelectedGroupKey = oCmbGroup.getSelectedKey();              //조 정보가 담겨있는 콤보박스가 선택한 key
            if(!oParameter && sSelectedGroupKey == ""){                     //모든 정보를 지웠을 때 filter 초기화.
                oTabStd.getBinding("items").filter();                       
            }
            else if(!oParameter){                                           //소속된 group의 정보를 지웠을 때 class 으로만 filter를 적용함
                let oGroupFilter = new Filter("sGroup", "EQ", sSelectedGroupKey);
                oTabStd.getBinding("items").filter(oGroupFilter);           //전체 반에 대한 그룹(ex. 모든 반의 2조)을 보고싶기 때문에, 필터를 Group만 적용함
            }
        },        
        // 소속된 조 정보를 바꿨을 때
        onGroupSelectionChange(oEvt){
            let oView = this.getView()
            let oTabStd = oView.byId("tabStd");                                     //테이블 정보
            let oParameter = oEvt.getParameter("selectedItem");                     //선택된 아이템의 Parameter
            let oCmbClass = oView.byId("cmbClass");                                 //반 선택 콤보박스 정보
            let sSelectedClassKey = oCmbClass.getSelectedKey();                     //반 선택 콤보박스가 선택한 key
            if(!oParameter && sSelectedClassKey == ""){                             //모든 정보를 지웠을 때 filter 초기화.
                oTabStd.getBinding("items").filter();                       
            }
            else if(!oParameter) {                                                  //소속된 반의 정보를 지웠을 때 group 으로만 filter를 적용함                
                let oClassFilter = new Filter("cId", "EQ", sSelectedClassKey);
                oTabStd.getBinding("items").filter(oClassFilter);                   //그룹 필터링 없이 반 전체의 정보를 보고싶기 때문에, 필터를 Class만 적용함
            }else{                                                                  //소속된 반의 정보를 지웠을 때 sSelectedClassKey가 ""로 나오는것을 확인해 조건문에 추가함.
                let oContext = oParameter.getBindingContext("gInfo");               //group 모델에서 선택된 아이템의 BindingContext
                let oStdModel = oView.getModel("gInfo");                            //group 모델 정보
                let sSelectedGroupKey = oStdModel.getProperty("id", oContext);      //선택된 아이템 정보의 BindingContext를 통해 id 속성의 값을 가져옴                
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
            let oTabStd = oView.byId("tabStd");                       //테이블 정보
            let oParameter = oEvt.getParameter("listItem");                     //선택된 아이템의 Parameter
            let sPath = oParameter.getBindingContext("mInfo").getPath();
            let oStdModel = oView.getModel("mInfo");
            //패널에 bindElement를 통해 선택한 학생의 경로로 지정함.
            //조 정보는 gInfo에서 조장 정보는 새로운 세컨드리 모델에서 가져오려고 했으나, 방법이 여의치 않아 조 정보는 바인딩 경로 뒤에 "조"를 붙이고,
            //조장 정보는 새로운 모델을 선언하고 key값을 L/S/N value값을 조장/부조장/조원으로 지정해 조회한다.
            oView.byId("panStdDetail").bindElement("mInfo>" + sPath);              
            let oContext = oParameter.getBindingContext("mInfo");
            let sLeaderId = oStdModel.getProperty("sLeader", oContext);
            //전공여부 확인
            if(oStdModel.getProperty("sMajor", oContext) == "Y"){
                oView.byId("chkMajor").setSelected(true);
            }else{
                oView.byId("chkMajor").setSelected(false);
            }
            //학생 클릭과 동시에 패널이 펴짐.
            oView.byId("panClassDetail").setExpanded(true);
            oView.byId("panStdDetail").setExpanded(true);          
            //사용자가 선택한 학생정보의 반 정보를 키값삼아서 classList에서 그 키값의 경로를 찾는 기능.
            let oItem = oTabStd.getSelectedItem();
            if (!oItem) return;                                   
            let oContext2 = oItem.getBindingContext("mInfo");      
            let sSelectedCId = oContext2.getProperty("cId");       
            let oClassFilter = new Filter("cId", "EQ", sSelectedCId);            
            let oBinding = oStdModel.bindList("/classList", null, null, oClassFilter);            
            let aContexts = oBinding.getContexts();    
            let oPanClassDetail = oView.byId("panClassDetail");
            oPanClassDetail.bindElement("mInfo>" + aContexts[0].getPath());            
            //모델을 하나 선언해서 조원들의 역할정보를 가져옴
            let oRoleData = { 
                roleList: {L: "조장", S: "부조장", N: "조원"}
            };
            let oRoleModel = new JSONModel()
            oRoleModel.setData(oRoleData);                                    
            let sRoleName = oRoleModel.getProperty("/roleList/" + sLeaderId);               
            oView.byId("inpSLeader").setDescription(sRoleName);   
        },
        //팝업 작동부
        onPopup(sPath, sTGender, sStGender){
            if(!this.pDialog){
                this.pDialog = this.loadFragment({
                    name: "ncode.zc319lev3.view.Popup"
                });
            }
            //then 내부의 function 안에서는 this가 undefined기 때문에 this.getView()를 then 전에 선언해서 변수에 저장함.
            let oView = this.getView();
            this.pDialog.then(
                function (oPopup) {
                    oPopup.bindElement("mInfo>" + sPath);
                    oView.byId("inpCTeacher").setDescription(sTGender);         
                    oView.byId("inpCinTeacher").setDescription(sStGender);
                    oPopup.open();
            });
        },
        //팝업 종료
        onClose(){
            this.getView().byId("idDialog").close();
        },
        onShowTeacherDetail(){
            let oView = this.getView();            
            let oStdModel = oView.getModel("mInfo");
            let oItem = oView.byId("tabStd").getSelectedItem();
            if (!oItem) { return; }
            let sSelectedCId = oItem.getBindingContext("mInfo").getProperty("cId");
            let oClassFilter = new Filter("cId", "EQ", sSelectedCId);
            let oBinding = oStdModel.bindList("/classList", null, null, oClassFilter);
            let aContexts = oBinding.getContexts(); 
            //객체의 키값을 tGender와 stGender의 값과 동일하게 맞춰서 바로 조회 가능한 데이터셋을 이용해 성별값을 지정해줌.
            let oGenderInfo = {1:"남성", 2:"여성"};
            let sTGender = oGenderInfo[oStdModel.getProperty("tGender", aContexts[0])]
            let sStGender = oGenderInfo[oStdModel.getProperty("stGender", aContexts[0])]            
            this.onPopup(aContexts[0].getPath(), sTGender, sStGender);
        },
        //검색버튼 실행부. 조가 어떤 조가 선택되어 있어도 그 반의 모든 학생정보가 나오게 설정함.
        onSearch(){
            let oView = this.getView();
            let oCmbClass = oView.byId("cmbClass");            
            let sSelectedClassKey = oCmbClass.getSelectedKey();                  //반 선택 콤보박스가 선택한 Key            
            let oTabStd = oView.byId("tabStd");            
            let oClassFilter = new Filter("cId", "EQ", sSelectedClassKey);            
            if((sSelectedClassKey == "0" || sSelectedClassKey == "") && (sSelectedGroupKey == "0" || sSelectedGroupKey == "")){     
                    oTabStd.getBinding("items").filter();               //필터 안의 파라미터를 비워서 필터를 초기화시킴
                }else {
                    oTabStd.getBinding("items").filter(oClassFilter);           //사용자가 원하는 반의 조를 전부 필터링함
                }                     
        }        
    });
});