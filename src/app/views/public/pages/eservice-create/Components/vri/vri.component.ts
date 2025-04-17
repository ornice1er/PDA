import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas, NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  IgxStepperComponent, IgxStepperModule, IStepChangingEventArgs } from 'igniteui-angular';
import { ToastrService } from 'ngx-toastr';
import { VriForm } from '../../../../../../core/forms/vri_form';
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
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-vri',
  templateUrl: './vri.component.html',

      standalone: true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,IgxStepperModule, BrowserAnimationsModule,
          NgxSpinnerModule,],
  styleUrls: ['./vri.component.css']
})
export class VriComponent {
  myRequestForm=VriForm
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

@ViewChild("reqTop") reqTop!: ElementRef<HTMLElement>;
@ViewChild('stepper')stepper!:IgxStepperComponent
@ViewChild('fileInp')fileInp!:ElementRef
bounce: any;
code:any

  constructor(
    private eserviceService:EserviceService,
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
  }
  ngOnDestroy(): void {
  
  }
  ngAfterViewInit(){
    this.reqTop.nativeElement.scrollIntoView()
  }

  ngOnInit(): void {

    this.code=this.activatedRoute.snapshot.paramMap.get('code')
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


  getCommunes(event:any){
    this.eserviceService.getAllCommune(event.target.value).subscribe((res:any)=>{
      this.communes=res
    })
  }
  getNatureContracts(){
    this.eserviceService.getNatureContracts().subscribe((res:any)=>{
      this.ncs=res.data
    })
  }

  async uploadIfu(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
     this.myRequestForm.doc_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.doc_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm.doc_file.isSetted=true
    }
  } 
    async uploadRccm(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
     this.myRequestForm.rccm_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.rccm_file.file64=arrInput
      this.myRequestForm.rccm_file.isSetted=true
    }
  } 
    async uploadDelegate(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
     this.myRequestForm.delegate_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.delegate_file.file64=arrInput
      this.myRequestForm.delegate_file.isSetted=true
    }
  } 
    async uploadRi(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
     this.myRequestForm.ri_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.ri_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm.ri_file.isSetted=true
    }
  } 

  store(myForm:any){
    let files:any[]=[]
    let formData= new FormData()

    if (this.myRequestForm.ri_file.file64!= "") {
      files.push({
        name:this.myRequestForm.ri_file.name,
        file64:this.myRequestForm.ri_file.file64
      })
    }

    if (this.myRequestForm.doc_file.file64!= "") {
      files.push({
        name:this.myRequestForm.doc_file.name,
        file64:this.myRequestForm.doc_file.file64
      })
    }

    formData.append('myFiles',JSON.stringify(files))
    formData.append('infos',JSON.stringify(this.myRequestForm))
    formData.append('from_pns',"0")
    formData.append('code',this.code)

    
    this.loading=true
      this.eserviceService.store(formData).subscribe((res:any)=>{
        this.loading=false

        this.toastrService.success(res.message)
        this.reqTop.nativeElement.scrollTop
        this.reInit()
        myForm.resetForm()
        this.stepper.navigateTo(0)
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
    this.stepper.activeStepChanged.subscribe((res:any)=>{
        this.last_step=res.newIndex
        console.log(res)
      if (res.newIndex >  res.oldIndex) {
       
        switch (res.oldIndex) {

        case 0:
            this.verifyStepper1(res)
          break;
        case 1:
         this.verifyStepper2(res)
          break;
          case 2:
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
    if(
    (  this.myRequestForm.name_structure=="" ||
      this.myRequestForm.type_structure=="" ||
      this.myRequestForm.department=="" ||
      this.myRequestForm.municipality_id=="" ||
      this.myRequestForm.city=="" ||
      this.myRequestForm.district=="" ||
      this.myRequestForm.doc_file.file=="")||
      (
        this.myRequestForm.has_delegate=="1"&&
        this.myRequestForm.delegate_file.file=="" 
      )
        ){
          res.cancel=true
          this.toastrService.warning('Veuillez remplir tous les champes requis','Informations sur la structure')
      }else{
        res.cancel=false
      }
  }
  verifyStepper2(res:any){
    if(
    this.myRequestForm.identity=="" ||
    this.myRequestForm.job=="" ||
    this.myRequestForm.phone=="" ||
    this.myRequestForm.email=="" 
      ){
        res.cancel=true
        this.toastrService.warning('Veuillez remplir tous les champes requis','Informations sur le soumissionnaire')
    }else{
      if (!this.isValidEmail(this.myRequestForm.email)) {
            res.cancel=true
            this.toastrService.warning('Veuillez insérer un email valide','Email validation')
      
          }else{
            res.cancel=false
      
          }
    }
  }
  verifyStepper3(res:any){
    if(

      this.myRequestForm.ri_file.file=="" 
        ){
          res.cancel=true
          this.toastrService.warning('Veuillez remplir tous les champes requis','Charger le fichier de règlement intérieur (Version PDF)')
      }else{
        res.cancel=false
      }
  }

  public handleActiveStepChanging(event: IStepChangingEventArgs) {
    console.log("ici")
    if (event.newIndex >  event.oldIndex) {

    switch (event.oldIndex) {

      case 0:
          this.verifyStepper1(event)
        break;
      case 1:
        this.verifyStepper2(event)
        break;
      case 2:
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

  openOldSchoolEdition(content:any,i:any){
    this.oldSchoolCurrentIndex=i
    this.modalService.open(content)
  }
  removeItem(i:any){
    this.myRequestForm.old_schools.splice(i,1)
  }

  addElement(form:NgForm){
   

    this.myRequestForm.list.push({
      identity:form.value.identity,
      nationality:form.value.nationality,
      speciality:form.value.speciality,
      job:form.value.job,
      nature:form.value.nature,
      file:this.myfile
    })
    console.log(this.myRequestForm.list)
    this.modalService.dismissAll()
    this.reInitFiles()
    form.resetForm()

  }
  editElement(){
    this.modalService.dismissAll()
  }
 

  openEdition(content:any,i:any){
    this.elementCurrentIndex=i
    this.modalService.open(content)
  }
  removeItem2(i:any){
    this.myRequestForm.list.splice(i,1)
  }



  add(content:any){
    this.modalService.open(content,{size:'lg'});
  }

  convertTobase64(){
    this.settedFiles.forEach(async (el:any) => {
      el.fileArrayBuffer=await FileService.fromArrayBufferToBase64(await FileService.readFileAsync(el.file)) 
    })
  }

  changeIfu(){
    this.myRequestForm.doc_file.isSetted=false
  }

  changeRccm(){
    this.myRequestForm.rccm_file.isSetted=false
  }

  changeCR(){
    this.myRequestForm.criminal_record_file.isSetted=false
  }

  async uploadAtachementFile(event:any, index?:any){
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
      let arrInput=await FileService.readFileAsync(this.fileInput)
      
      this.myfile.name="Contrat"
      this.myfile.file=this.fileInput
      this.myfile.isSetted=true
      this.myfile.file64=arrInput
     }
  }
  async uploadChangedAtachementFile(event:any, index:any){
    if(event.target.files.length>0){
      this.fileInput=event.target.files[0]
      let arrInput=await FileService.readFileAsync(this.fileInput)
      let current =this.myRequestForm.list[this.elementCurrentIndex].files[index];
         current.file64=arrInput
         current.file=this.fileInput
         current.isSetted=true
         this.myRequestForm.list[this.elementCurrentIndex].files.slice(index,current)
     }
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
    this.myRequestForm={
      name_structure:"",
      type_structure:"",
      department:"",
      municipality_id:"",
      city:"",
      district:"",
      ifu:"",
      ifu_file:{
          file:"",
          name:"IFU",
          file64:"",
          isSetted:false
  
      },
      rccm:"",
      rccm_file:{
          file:"",
          name:"RCCM",
          file64:"",
          isSetted:false
  
      },
      has_delegate:0,
      delegate_file:{
          file:"",
          name:"Avis du ou des délégués du personnel (Version PDF)",
          file64:"",
          isSetted:false
  
      },
      identity:"",
      job:"",
      phone:"",
      email:"",
      ri_file:{
          file:"",
          name:"Règlement intérieur",
          file64:"",
          isSetted:false
  
      },
      doc_file:{
          file:"",
          name:"Pièce d'identification (IFU,RCCM,CNI,CIP,...)",
          file64:"",
          isSetted:false
  
      }
    }
  }
}
