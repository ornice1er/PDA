import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas, NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IgxStepperComponent, IgxStepperModule, IStepChangingEventArgs } from 'igniteui-angular';
import { ToastrService } from 'ngx-toastr';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce } from 'ng-animate';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { contractForm } from '../../../../../../core/forms/vcn_form';
import { VcnForm } from '../../../../../../core/forms/vcn_form copy';
import { EserviceService } from '../../../../../../core/services/eservice.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { FileService } from '../../../../../../core/utils/file-service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { StatutComponent } from '../../../../../components/statut/statut.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-vcn',
  templateUrl: './vcn.component.html',

      standalone: true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,IgxStepperModule, BrowserAnimationsModule,
          NgxSpinnerModule,],
  styleUrls: ['./vcn.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounce,
       {
        // Set the duration to 5seconds and delay to 2seconds
        params: { timing: 2, delay: 1 }
      }))])
  ],
})
export class VCNComponent {
  myRequestForm=VcnForm
  myContractForm=contractForm
  ts:any[]=[];
  communes:any[]=[];
  departs:any[]=[];
  ncs:any[]=[];
  requiredFiles:any[]=[];
  settedFiles:any[]=[];
  imageSrc!: string | SafeResourceUrl | undefined ;
  fileInput:any
  last_step=-1;
  loading=false
  ay:any;
  oldSchoolCurrentIndex:any=0;
  elementCurrentIndex:any=0;
  system=""
  nationality="Béninoise"
  myfile:any={
    file:"",
    name:"Acte de naissance",
    file64:"",
    isSetted:false

  }
  
@Input('checkData')checkData:any;

@ViewChild("reqTop") reqTop!: ElementRef<HTMLElement>;
@ViewChild('stepper')stepper!:IgxStepperComponent
@ViewChild('fileInp')fileInp!:ElementRef
bounce: any;
code:any
slug:any
prestationCode:any

  constructor(
    private eserviceService:EserviceService,
    private spinner: NgxSpinnerService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private _sanitizationService: DomSanitizer,
    configOffCanvas: NgbOffcanvasConfig,
     private offcanvasService: NgbOffcanvas,
     private toastrService: ToastrService,
     private lsService:LocalStorageService,
     config: NgbModalConfig,
    private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
      
    configOffCanvas.position = 'end';
		configOffCanvas.backdropClass = 'bg-dark';
		configOffCanvas.keyboard = false;
   }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes)
   if (this.checkData !=undefined) {
    this.myRequestForm=JSON.parse(changes['checkData']['currentValue'].step_contents)

    if (this.myRequestForm[0].inputs[0].value =='moral') {
      this.eserviceService.getAllCommune(this.myRequestForm[3].inputs[4].key).subscribe((res:any)=>{
        this.communes=res
      })
    } else {
      this.eserviceService.getAllCommune(this.myRequestForm[2].inputs[4].key).subscribe((res:any)=>{
        this.communes=res
      })
    }
    

    // let el=JSON.parse(changes.checkData['currentValue'].details)
 
    // this.eserviceService.getAllCommune(this.myRequestForm.department_respo?.id).subscribe((res:any)=>{
    //   this.communes=res
    // })
    // this.toastrService.info('Veuillez procéder à la correction demandée','Identification')

    // if (el.department_respo?.id!="") {
    //   this.eserviceService.getAllCommune(el.department_respo?.id).subscribe((res:any)=>{
    //     this.communes=res
    //   })
    // } else {
    //   this.eserviceService.getAllCommune(el.department_structure?.id).subscribe((res:any)=>{
    //     this.communes=res
    //   })
    // }
    
   }
  }
  ngOnDestroy(): void {
  
  }
  ngAfterViewInit(){
    this.reqTop.nativeElement.scrollTop
    //this.reqTop.nativeElement.scrollIntoView()
  }

  ngOnInit(): void {

    this.code=this.activatedRoute.snapshot.paramMap.get('code')
    this.slug=this.activatedRoute.snapshot.paramMap.get('slug')
    this.prestationCode=this.activatedRoute.snapshot.paramMap.get('prestationCode')
    this.getNatureContracts()
    this.getDepartments()
    this.getTypeStructures()

  }

  getDepartments(){
    this.eserviceService.getAllDepart().subscribe((res:any)=>{
      this.departs=res
    })
  }

  getTypeStructures(){
    this.eserviceService.getTypeStructures().subscribe((res:any)=>{
      this.ts=res.data
    })
  }


  getCommunes(event:any,i:any,j:any){
    console.log(event)
    this.myRequestForm[i].inputs[j].key=event.id
    this.myRequestForm[i].inputs[j].value=event.libelle
    if (this.myRequestForm[0].inputs[0].value=="physique") {
     // this.myRequestForm.department_respo=event
    }else{
     // this.myRequestForm.department_structure=event
    }
    this.spinner.show()
    this.eserviceService.getAllCommune(event?.id).subscribe((res:any)=>{
      this.spinner.hide()
      this.communes=res
    },(err:any)=>{
      this.spinner.hide()

    })
  }

  updateFormValue(event:any,i:any,j:any){
    if (this.myRequestForm[0].inputs[0].value=="physique") {
     // this.myRequestForm.type_structure=event
    }else{
     // this.myRequestForm.type_structure=event
    }
    this.myRequestForm[i].inputs[j].key=event.id
    this.myRequestForm[i].inputs[j].value=event.libellecom
  }
  updateFormValue2(event:any,i?:any,j?:any){
    if (this.myRequestForm[0].inputs[0].value=="physique") {
      //this.myRequestForm.type_structure=event
    }else{
      //this.myRequestForm.type_structure=event
    }
    this.myRequestForm[i].inputs[j].key=event.id
    this.myRequestForm[i].inputs[j].value=event.libellecom
  }
  getNatureContracts(){
    this.eserviceService.getNatureContracts().subscribe((res:any)=>{
      this.ncs=res.data
    })
  }

  async uploadIfu(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm[2].files[0].file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm[2].files[0].isSetted=true
    }
  } 
    async uploadRccm(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm[3].files[0].file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm[3].files[0].isSetted=true
    }
  } 

  store(myForm:NgForm){   
    let files:any[]=[]
    let formData= new FormData()

    formData.append('step_contents',JSON.stringify(this.myRequestForm))
    formData.append('email',this.myRequestForm[1].inputs[3].value)
    formData.append('phone',this.myRequestForm[1].inputs[2].value)
    formData.append('from_pns',"0")
    if (this.checkData==undefined) {
      formData.append('code',this.code)
      formData.append('reqCode','')
    } else {
      formData.append('code',this.prestationCode)
      formData.append('reqCode',this.checkData.code)
    }
  
    this.loading=true
      this.eserviceService.store(formData).subscribe((res:any)=>{
        this.loading=false

        this.toastrService.success(res.message)
        this.reqTop.nativeElement.scrollTop
        this.reInit()
        myForm.resetForm()
        this.stepper.navigateTo(0)
      },(res:any)=>{
        this.loading=false
      })
  }


  trackByFn(index:any, item:any) {
    console.log(index,item)
    return item.isSetted; 
  }
  



  
  open(content:any, file:any) {
    //console.log(this.myRequestForm.doc_file)
    this.readURL(file)
		this.offcanvasService.open(content);
	}
  readURL(file: File): void {
    // this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(file)
    console.log(file)
    const reader = new FileReader();
    reader.onload = e =>{
     let src = reader.result as string
      this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(src)

    };
    reader.readAsDataURL(file);

}

removeFile(i:any){
  //this.fileInputs.splice(i,1)
  AppSweetAlert.confirmBox("error","Document joint","Voulez vous retier cette pièce ?").then((result:any)=>{
    if (result.isConfirmed) {
      this.requiredFiles[i].file="",
      this.requiredFiles[i].isSetted=false
    }
  })
 
}


  next(){
    console.log(this.myRequestForm)
    this.stepper.activeStepChanged.subscribe((res:any)=>{
        this.last_step=res.newIndex
        console.log(res)
      if (res.newIndex >  res.oldIndex) {
       
        switch (res.oldIndex) {

        case 0:
            this.verifyStepper1(res)
          break;
          case 1:
            this.verifyStepper5(res)
          break;
        case 2:
          this.myRequestForm[0].inputs[0].value=="physique"?this.verifyStepper2(res):this.verifyStepper4(res)
          break;
          case 3:
            this.verifyStepper3(res)
          break;
      
        default:
          this.stepper.navigateTo(0)
          break;
      }
    } 
    })
    this.stepper.next()
    this.reqTop.nativeElement.scrollIntoView()
  }

  prev(){

    this.stepper.prev()
  }

  verifyStepper1(res:any){
    if (this.myRequestForm[0].inputs[1].value=="1") {
      if(this.myRequestForm[0].inputs[3].value==""){
          res.cancel=true
          this.toastrService.warning('Veuillez insérer un code ','Type de demandeur')
         }else{
          res.cancel=false
    
        }
    } else {
      if( this.myRequestForm[0].inputs[0].value==""){
          res.cancel=true
          this.toastrService.warning('Veuillez choisir un type','Type de demandeur')
         }else{
          res.cancel=false
    
        }
    }
  
  }
  verifyStepper2(res:any){
    if(
      (this.myRequestForm[0].inputs[1].value ==1 && this.myRequestForm[0].inputs[2].value =="")
      ||
      (this.myRequestForm[0].inputs[1].value==0 && 
        (    
        this.myRequestForm[1].inputs[0].value=="" ||
        this.myRequestForm[1].inputs[1].value=="" ||
        this.myRequestForm[1].inputs[2].value=="" ||
        this.myRequestForm[1].inputs[3].value=="" ||
        this.myRequestForm[1].inputs[4].value=="" ||
        this.myRequestForm[1].inputs[5].value=="" ||
        this.myRequestForm[1].inputs[6].value=="" 
        )
        )){
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Informations sur le soumissionnaire')
    }else{
      if (!this.isValidEmail(this.myRequestForm[1].inputs[3].value)) {
            res.cancel=true
            this.toastrService.warning('Veuillez insérer un email valide','Email validation')
      
          }else{
            res.cancel=false
      
          }
    }
  }
  verifyStepper3(res:any){
    if(
      this.myRequestForm[4].contracts.length==0
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez charger au moins un élément','Informations sur la structure')
    }else{
      res.cancel=false
    }
   
  }
  verifyStepper4(res:any){
    console.log(this.myRequestForm)
    if(
      this.myRequestForm[3].inputs[0].value=="" ||
      this.myRequestForm[3].inputs[1].value=="" ||
      this.myRequestForm[3].inputs[2].value=="" ||
      this.myRequestForm[3].inputs[3].value=="" ||
      this.myRequestForm[3].inputs[4].value=="" ||
      this.myRequestForm[3].inputs[5].value=="" ||
      this.myRequestForm[3].inputs[6].value=="" 
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Nombre de contrats à soumettre pour visa')
    }else{
      if (!this.isValidEmail(this.myRequestForm[3].inputs[3].value)) {
        res.cancel=true
        this.toastrService.warning('Veuillez insérer un email valide','Email validation')
  
      }else{
        res.cancel=false
  
      }    }
}
verifyStepper5(res:any){
  if(
    this.myRequestForm[1].inputs[0].value=="" ||
    this.myRequestForm[1].inputs[1].value=="" ||
    this.myRequestForm[1].inputs[2].value=="" ||
    this.myRequestForm[1].inputs[3].value==""
    ){
      res.cancel=true
      this.toastrService.warning('Veuillez remplir tous les champes requis','Informations sur le soumissionnaire')
  }else{
    if (!this.isValidEmail(this.myRequestForm[1].inputs[3].value)) {
          res.cancel=true
          this.toastrService.warning('Veuillez insérer un email valide','Email validation')
    
        }else{
          if ( this.myRequestForm[1].inputs[4].value) {
            this.myRequestForm[2].inputs[0].value=this.myRequestForm[1].inputs[0].value
            this.myRequestForm[2].inputs[1].value=this.myRequestForm[1].inputs[1].value
            this.myRequestForm[2].inputs[2].value=this.myRequestForm[1].inputs[2].value
            this.myRequestForm[2].inputs[3].value=this.myRequestForm[1].inputs[3].value
          }else{
            this.myRequestForm[3].inputs[0].value=this.myRequestForm[1].inputs[0].value
            this.myRequestForm[3].inputs[1].value=this.myRequestForm[1].inputs[1].value
            this.myRequestForm[3].inputs[2].value=this.myRequestForm[1].inputs[2].value
            this.myRequestForm[3].inputs[3].value=this.myRequestForm[1].inputs[3].value
          }
          res.cancel=false
    
        }
  }
}

getEntrepriseDetails(){
 // this.stepper.next();
  this.spinner.show();
  this.myRequestForm[0].inputs[2].value= this.myRequestForm[0].inputs[0].value =='moral'?this.myRequestForm[0].inputs[4].value:this.myRequestForm[0].inputs[3].value
  this.eserviceService.getEntrepriseDetails(this.myRequestForm[0].inputs[2].value).subscribe((res:any)=>{
    if (res.success) {
      this.myRequestForm=JSON.parse(res.data.step_contents)

      this.toastrService.success('Bienvenue cher usager','Identification')

      if (this.myRequestForm[0].inputs[0].value =='moral') {
        this.eserviceService.getAllCommune(this.myRequestForm[3].inputs[4].key).subscribe((res:any)=>{
          this.communes=res
        })
      } else {
        this.eserviceService.getAllCommune(this.myRequestForm[2].inputs[4].key).subscribe((res:any)=>{
          this.communes=res
        })
      }
      

      console.log(this.myRequestForm[2].inputs[4])
      this.stepper.navigateTo(0)

    } else {

      this.toastrService.warning('Aucune donnée trouvée avec ce code','Identification')

    }

    this.spinner.hide();
    this.stepper.next();
  },(err:any)=>{
    this.spinner.hide();

    this.toastrService.warning(err.error,'Identification promoteur')

  })

}

  public handleActiveStepChanging(event: IStepChangingEventArgs) {
    console.log("ici")
    if (event.newIndex >  event.oldIndex) {

    switch (event.oldIndex) {

      case 0:
          this.verifyStepper1(event)
        break;
        case 1:
          this.verifyStepper5(event)
        break;
      case 2:
        this.myRequestForm[0].inputs[0].value=="physique"?this.verifyStepper2(event):this.verifyStepper4(event)
        break;
      case 3:
          this.verifyStepper3(event)
        break;
    
      default:
        this.stepper.navigateTo(0)
        break;
    }
  }
   }

 


  filterByType(type:any){
    return this.requiredFiles.filter((el:any) => el.type==type && el.isRequired == true)
  }

  verifiedFiles(type:any){
    let files= this.filterByType(type)
    let notSetted= files.filter((el:any)=>el.isSetted==false);

    return notSetted.length >0 ? false:true
  }

  checkControl(){
    //this.dropdownList=this.dropdownList2
  }


  public isValidEmail(emailString: string): boolean {
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      let valid = pattern.test(emailString);
      return valid;
    } catch (TypeError) {
      return false;
    }
  }



  addElement(form:NgForm){
   
    let contract= this.myRequestForm[4].contracts.find((el:any)=>el.npi==form.value.npi)
    console.log(contract);
    if (contract!=undefined) {
      AppSweetAlert.simpleAlert('error',"Ajout d'employé","Un contrat avec ce NPI est déjà ajouté")
      return ;
    }
    this.myRequestForm[4].contracts.push({
      npi:form.value.npi,
      identity:form.value.identity,
      nationality:form.value.nationality,
      speciality:form.value.speciality,
      job:form.value.job,
      nature:form.value.nature,
      file:this.myfile,
      is_valid:null,
      proof:null,
      has_proof:false
    })
    this.modalService.dismissAll()
    this.reInitFiles()
    form.resetForm()
    this.nationality="Béninoise"
  }
  editElement(){
    this.modalService.dismissAll()
  }
 

  openEdition(content:any,i:any){
    this.elementCurrentIndex=i
    this.modalService.open(content)
  }
  removeItem2(i:any){
    this.myRequestForm[4].contracts.splice(i,1)
  }



  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }

  convertTobase64(){
    this.settedFiles.forEach(async (el:any) => {
      el.fileArrayBuffer=await FileService.fromArrayBufferToBase64(await FileService.readFileAsync(el.file)) 
    })
  }

  changeIfu(ind:any){
    if (ind==1) {
      this.myRequestForm[2].files[0].isSetted=false
    } else {
      this.myRequestForm[3].files[0].isSetted=true

    }
   // this.myRequestForm.doc_file.isSetted=false
  }

  changeRccm(){
   // this.myRequestForm.rccm_file.isSetted=false
  }

  changeCR(){
    //this.myRequestForm.criminal_record_file.isSetted=false
  }

  async uploadAtachementFile(event:any, index?:any){
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myfile.name="Contrat"
      this.myfile.file=this.fileInput
      this.myfile.isSetted=true
      this.myfile.file64=await FileService.fromArrayBufferToBase64(arrInput)
     }
  }
  async uploadChangedAtachementFile(event:any, index:any){
    // if(event.target.files.length>0){
    //   this.fileInput=event.target.files[0]
    //   let arrInput=await FileService.readFileAsync(this.fileInput)
    //   let current =this.myRequestForm.list[this.elementCurrentIndex].files[index];
    //      current.file64=await FileService.fromArrayBufferToBase64(arrInput)
    //      current.file=this.fileInput
    //      current.isSetted=true
    //      this.myRequestForm.list[this.elementCurrentIndex].files.slice(index,current)
    //  }
  }

  reInitFiles(){
    this.myfile={
      file:"",
      name:"Acte de naissance",
      file64:"",
      isSetted:false

  }
  }

  getNatureLabel(id:any){
   return  this.ncs.find((el:any) =>el.id ==id).name
  }
  getDepartmentLabel(id:any){
   return  this.departs.find((el:any) =>el.id ==id).libelle
  }
  getMunicipalityLabel(id:any){
   return  this.communes.find((el:any) =>el.id ==id).libellecom
  }
  getTypeStructureLable(id:any){
   return  this.ts.find((el:any) =>el.id ==id).name
  }

  reInit(){
   
  }
  setLabel1(label:any){
    this.myRequestForm[0].inputs[0].value=label
    this.myRequestForm[0].inputs[0].label='Personne physique'
    this.myRequestForm[2].is_active=true
    this.myRequestForm[3].is_active=false

  }
  setLabel2(label:any){
    this.myRequestForm[0].inputs[0].value=label
    this.myRequestForm[0].inputs[0].label='Personne morale'
    this.myRequestForm[2].is_active=false
    this.myRequestForm[3].is_active=true
  }

  openPdf(content:any,file:any){
    this.imageSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(file)
    this.offcanvasService.open(content);
 
   }
}
