import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbOffcanvasConfig, NgbOffcanvas, NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  IgxStepperComponent, IgxStepperModule, IStepChangingEventArgs } from 'igniteui-angular';
import { ToastrService } from 'ngx-toastr';
import { DamForm } from '../../../../../../core/forms/dam_form';
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
  selector: 'app-dam',
  templateUrl: './dam.component.html',

      standalone: true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,StatutComponent,IgxStepperModule, BrowserAnimationsModule,
          NgxSpinnerModule,],
  styleUrls: ['./dam.component.css']
})
export class DAMComponent {
  myRequestForm=DamForm
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
     this.myRequestForm.ifu_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.ifu_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm.ifu_file.isSetted=true
    }
  } 
    async uploadAn(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
     this.myRequestForm.an_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.an_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm.an_file.isSetted=true
    }
  } 
    async uploadCertificat(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
     this.myRequestForm.certificat_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.certificat_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm.certificat_file.isSetted=true
    }
  } 
    async uploadAuth(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
     this.myRequestForm.authenticite_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.authenticite_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm.authenticite_file.isSetted=true
    }
  } 
  async uploadPrivate(event:any){
    if(event.target.files.length>0){
     this.fileInput=event.target.files[0]
     this.myRequestForm.private_file.file=this.fileInput
      let arrInput=await FileService.readFileAsync(this.fileInput)
      this.myRequestForm.private_file.file64=await FileService.fromArrayBufferToBase64(arrInput)
      this.myRequestForm.private_file.isSetted=true
    }
  } 

  store(myForm:any){
    let files:any[]=[]
    let formData= new FormData()

    if (this.myRequestForm.ifu_file.file64!= "") {
      files.push({
        name:this.myRequestForm.ifu_file.name,
        file64:this.myRequestForm.ifu_file.file64
      })
    }

    if (this.myRequestForm.an_file.file64!= "") {
      files.push({
        name:this.myRequestForm.an_file.name,
        file64:this.myRequestForm.an_file.file64
      })
    }

 
    if (this.myRequestForm.certificat_file.file64!= "") {
      files.push({
        name:this.myRequestForm.certificat_file.name,
        file64:this.myRequestForm.certificat_file.file64
      })
    }

    if (this.myRequestForm.authenticite_file.file64!= "") {
      files.push({
        name:this.myRequestForm.authenticite_file.name,
        file64:this.myRequestForm.authenticite_file.file64
      })
    }
    if (this.myRequestForm.private_file.file64!= "") {
      files.push({
        name:this.myRequestForm.private_file.name,
        file64:this.myRequestForm.private_file.file64
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
    //console.log(this.myRequestForm.ifu_file)
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
    console.log(this.myRequestForm)
    if(
      this.myRequestForm.identity=="" ||
      this.myRequestForm.cip=="" ||
      this.myRequestForm.phone=="" ||
      this.myRequestForm.email==""  ||
      this.myRequestForm.ifu=="" ||
      this.myRequestForm.ifu_file.file=="" 
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
  verifyStepper2(res:any){
    if(
      this.myRequestForm.an_file.file==""  ||
      this.myRequestForm.certificat_file.file==""  ||
      this.myRequestForm.authenticite_file.file==""  ||
      this.myRequestForm.private_file.file=="" 
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
    this.myRequestForm.ifu_file.isSetted=false
  }

  changeAn(){
    this.myRequestForm.an_file.isSetted=false
  }

  changeCertificat(){
    this.myRequestForm.certificat_file.isSetted=false
  }
  changeAuth(){
    this.myRequestForm.authenticite_file.isSetted=false
  }
  changePrivate(){
    this.myRequestForm.private_file.isSetted=false
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
      identity:"",
      phone:"",
      email:"",
      cip:"",
      ifu:"",
      ifu_file:{
          file:"",
          name:"IFU",
          file64:"",
          isSetted:false
  
      },
      an_file:{
          file:"",
          name:"Acte de naissance légalisé",
          file64:"",
          isSetted:false
  
      },
      certificat_file:{
          file:"",
          name:"Certificat ou diplôme d'étude spécialisé en santé au travail légalisé",
          file64:"",
          isSetted:false
  
      },
  
      authenticite_file:{
          file:"",
          name:"Attestation d'authenticité des diplômes obtenus à l'étranger s'il y a lieu",
          file64:"",
          isSetted:false
  
      },
  
      private_file:{
          file:"",
          name:"Autorisation d'exercice en clientèle privée",
          file64:"",
          isSetted:false
  
      },
    
  }
  }
}
