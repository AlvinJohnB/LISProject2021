import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import Moment from 'moment'
import arialbd from '../../fonts/arialbd.ttf'
import arial from '../../fonts/arial.ttf'
import logo from '../../images/stcamlogo.jpg'
import lablogo from '../../images/lablogo.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'
import host from '../../config.json'

Font.register({ family: 'arialbd', src: arialbd, fontStyle: 'normal', fontWeight: 'bold' });
Font.register({ family: 'arial', src: arial, fontStyle: 'normal', fontWeight: 'normal' });



// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 450,
    paddingHorizontal: 35,
  },
  header:{
    textAlign: 'center',
  },
  companyText:{
    fontSize: 11,
    fontFamily: 'Helvetica-Bold'
  },
  companyContacts:{
    fontSize: 8
  },
  patientHeader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  column:{
    width: 300,
    marginRight: 20
  },
  column1:{
    width: 200
  },
  patientInfo:{
    fontSize: '9px'
  },
  footerText:{
    fontSize: '8px',
    textAlign: 'center',
  }
  ,
  footer:{
    position: 'absolute',
    bottom: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  resultHeader:{
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    fontFamily: 'Helvetica-Bold',
    fontSize: '11px'
  },
  
   resultBody:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
     fontSize: '8px'
  },
  testName: {
    width: 175,
    paddingLeft: 15
  },
  resultText:{
    width: 215,
    textAlign: 'center',
  },
  unitText:{
    width: 75,
    textAlign: 'center'
},
  referenceText:{
    width: 90,
    textAlign: 'center'
  },
  sectiontext:{
    fontFamily: 'Helvetica-Bold',
    fontSize: '9px',
  },
  abnormal:{
    fontFamily: 'Helvetica-Bold',
  },
logo:{
  width: "55px",
  position: 'absolute',
  left: "10px",
  bottom: "5px"
},
flag:{
  width: '55px',
},
contentCenter:{
  justifyContent: 'center'
},
lablogo:{
    width: "55px",
    position: 'absolute',
    right: "10px",
  	bottom: "5px"
},
caps:{
  textTransform: "uppercase"
},
marginBot:{
  marginBottom: 5,
  marginTop: 5
},

footerBlock:{
  alignItems: 'center',
  margin: 1
}
,
footerContainer:{
  display: 'flex',
  flexDirection:'row',
  justifyContent: 'space-around',
  width: 602
},
prevResText:{
  width: 90,
  textAlign: 'center',
},
prevRes:{
  fontSize: 8
},
comment:{
  fontSize: 7
},
borderBot:
{
  borderBottom: '1px dotted black'
}
});

// Create Document Component
const ResultForm = (props) => {

  const [pathoInfo, setPathoInfo] = useState({id: 1, username: "DocTin", password: 'Patho1', name: 'Modesty A. Leano, MD, FPSP', pathologist: 'Pathologist', title: 'ANATOMIC AND CLINICAL PATHOLOGIST', licenseNo: '98717'})

  useEffect(()=>{
     axios.get(`http://${host.ip}:3001/auth/info/${props.data.Sectionorders[0].pathologist}`).then((response) => {
        setPathoInfo(response.data)
        })
  },[])



  return(
    <Document>
    <Page size="Letter" style={styles.body}>

    <View style={styles.header} fixed={true}>
        <Image src={logo} style={styles.logo}/>
        <Image src={lablogo} style={styles.lablogo}/>
        <Text style={styles.companyText}>{host.companyname}</Text>
        <Text style={styles.companyContacts}>{host.companyAddress}</Text>
        <Text style={styles.companyContacts}>{host.companyContact}</Text>
        <Text style={styles.companyText}>Laboratory Report</Text>   
    </View>
      
    <View style={styles.patientHeader} fixed={true}>
        <View style={styles.column}>
          <Text style={styles.patientInfo}>Patient Name: {props.data.Patientlists[0].lastname}, {props.data.Patientlists[0].firstname} {props.data.Patientlists[0].middlename}</Text>
          <Text style={styles.patientInfo}>Age/Gender: {props.data.Patientlists[0].age} / {props.data.Patientlists[0].gender}</Text>
          <Text style={styles.patientInfo}>Requesting Physician: {props.data.reqDr}</Text>
          <Text style={styles.patientInfo}>Date Requested: {Moment(props.data.createdAt).format('MMMM DD, yyyy hh:mm a')}</Text>
        </View>
        
        <View style={styles.column1}>
          <Text style={styles.patientInfo}>Date: {Moment(Date.now()).format('MMMM DD, yyyy')}</Text>
          <Text style={styles.patientInfo}>Patient Type/Room No.: {props.data.ptType}</Text>
          <Text style={styles.patientInfo}>Laboratory Number: {props.data.labNumber}</Text>
          <Text style={styles.patientInfo}>Date Released: {Moment(props.data.updatedAt).format('MMMM DD, yyyy hh:mm a')}</Text>
        </View>
      </View>
      
      
      <View style={styles.resultHeader} fixed={true}>
          <Text style={styles.testName}>Test Name</Text>
          {/* Do Something here Prev Res */}
          {props.includePrev === true ? <Text style={[styles.prevResText, styles.prevRes]}>Previous Result {Moment(props.prevResDetails.updatedAt).format('MMMM DD, yyyy')}</Text> : null}
          <Text style={styles.resultText}>Result</Text>
          <Text style={styles.unitText}>Unit</Text>
         <Text style={styles.referenceText}>Reference</Text>
      </View>
      

         
      {props.data.Sectionorders.map((section, key) => {
            return(
                <View key={key}>
                    <Text style={[styles.sectiontext, styles.caps, styles.marginBot]}>{section.section === "CM" ? `Clinical Microscopy` : section.section}</Text>
                {section.Sectionresults.map((result, index) => {
                    return(
                        <View key={index}>
                            {result.result === "!" || result.result === null ?  <View></View> : <View wrap={false}>
                            {result.Testslist.isPackage === true && (<Text style={[styles.sectiontext, styles.borderBot]}>{result.Testslist.testname}</Text>)}
                            {result.Testslist.isPackage === false && (<View style={[styles.resultBody, styles.borderBot]}>
                                                                        <Text style={styles.testName}>{result.Testslist.testname}</Text>
                                                                        
                                                                        {/* Do something here, Prev res */}
                                                                        {props.includePrev === true ?
                                                                          <Text style={styles.prevResText}>
                                                                          {props.PrevResData.map((pres) => {
                                                                            return(
                                                                              result.Testslist.testcode === pres.test ? pres.result : null
                                                                            )
                                                                          })}
                                                                        </Text>
                                                                          : null}
                                                                        

                                                                        {/* DO SOMETHING HERE, RESULT */}
                                                                        {result.flag === "N/A" ? <Text style={styles.resultText}>{result.result}</Text> : (

                                                                          <Text style={[styles.resultText, styles.contentCenter]}>{result.result}</Text>

                                                                          )}
                                                                       

                                                                        <Text style={styles.unitText}>{result.Testslist.unit}</Text>
                                                                        <Text style={styles.referenceText}>{props.data.Patientlists[0].gender === "Male" ? `${result.Testslist.Referencevalue.Male}` : `${result.Testslist.Referencevalue.Female}`}</Text>
                                                                    </View>)}
                            </View>}
                        </View>
                    )
                })}

                {section.Sectionresults.map((comment, index) =>{
                  return(
                    <View key={index}>
                      {comment.test === "SACRATI" ? 
                        <View>
                            <Text style={styles.comment}>Comment/s:</Text>
                            <Text style={styles.comment}>Limitation: Specimen with alkaline pH, elevated pus, menstrual blood, or vaginal discharge may cause high albumin result. Diagnosis should not be based on a single test method or test result.</Text>
                            <Text style={styles.comment}> </Text>   
                            <Text style={styles.comment}>Clinical Determination:</Text>   
                            <Text style={styles.comment}>No Microalbumin: 0-29</Text>    
                            <Text style={styles.comment}>Clinical Microalbuminuria: 30-300</Text>  
                            <Text style={styles.comment}>Macroalbuminuria: greater than 300 </Text> 
                        </View> 
                      : null}
                    </View>
                  )
                  })}
                
                </View>
            )
         })}
         
     
      
      
      
      
      <View style={styles.footer} fixed={true}>

        <View style={styles.footerContainer}>

              { props.data.Sectionorders[0].performedBy !== props.data.Sectionorders[0].releasedBy && 
                <View style={styles.footerBlock}>
                <Text style={styles.footerText}>{props.data.Sectionorders[0].performedBy}</Text>
                <Text style={styles.footerText}>PERFORMER</Text>
              </View>
              }


              <View style={styles.footerBlock}>
                <Text style={styles.footerText}>{props.data.Sectionorders[0].releasedBy}</Text>
                <Text style={styles.footerText}>REGISTERED MEDICAL TECHNOLOGIST</Text>
                <Text style={styles.footerText}>License No.: _____</Text>
              </View>
              
              <View style={styles.footerBlock}>
                <Text style={styles.footerText}>{props.data.Sectionorders[0].pathologist}</Text>
                <Text style={[styles.footerText, styles.caps]}>{pathoInfo.title}</Text>
                <Text style={styles.footerText}>License No: {pathoInfo.licenseNo}</Text>
              </View>

        </View>


      </View>
      
    </Page>
  </Document>
)
};

export default ResultForm;
