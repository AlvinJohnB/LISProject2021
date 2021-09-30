import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import Moment from 'moment'
import arialbd from '../../fonts/arialbd.ttf'


const data = {
  "id": 4,
  "reqDr": "Dr. D",
  "testsRequested": "FBS LIPID BUN CREA ALT/SGPT AST/SGOT ",
  "encodedBy": "ALVINJOHNEB",
  "labNumber": "CAM-2021-9-4",
  "ptType": "OPD",
  "status": "RELEASED",
  "createdAt": "2021-09-22T17:46:31.000Z",
  "updatedAt": "2021-09-22T17:47:32.000Z",
  "forPtId": 1,
  "Patientlists": [
    {
      "id": 1,
      "branchid": "CAMILLUS-1",
      "lastname": "Bregana",
      "firstname": "Alvin John",
      "middlename": "Edra",
      "gender": "Male",
      "bday": "1998-06-05",
      "age": 23,
      "address": "Aguitap",
      "phone": "0997725143",
      "idenno": "2151607",
      "createdAt": "2021-09-22T15:46:29.000Z",
      "updatedAt": "2021-09-22T17:44:54.000Z",
      "Orderlist": {
        "PatientlistId": 1,
        "OrderId": 4
      }
    }
  ],
  "Sectionorders": [
    {
      "id": 4,
      "sectNumber": "(CHEM)-CAM-2021-9-4",
      "section": "Chemistry",
      "tests": "FBS LIPID BUN CREA ALT/SGPT AST/SGOT ",
      "status": "RELEASED",
      "updatedBy": "ALVINJOHNEB",
      "createdAt": "2021-09-22T17:46:31.000Z",
      "updatedAt": "2021-09-22T17:47:32.000Z",
      "forOrderID": 4,
      "Sectionresults": [
        {
          "id": 11,
          "test": "FBS",
          "result": "80",
          "TestslistId": 1,
          "Sectionorderlist": {
            "SectionresultId": 11,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 1,
            "testcode": "FBS",
            "testname": "Fasting Blood Sugar",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "mg/dL",
            "Referencevalue": {
              "id": 1,
              "test": "FBS",
              "Male": "70-100",
              "Female": "70-100",
              "TestslistId": 1
            }
          }
        },
        {
          "id": 12,
          "test": "LIPID",
          "result": null,
          "TestslistId": 2,
          "Sectionorderlist": {
            "SectionresultId": 12,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 2,
            "testcode": "LIPID",
            "testname": "Lipid Profile",
            "section": "Chemistry",
            "isPackage": true,
            "unit": "N/A",
            "Referencevalue": null
          }
        },
        {
          "id": 13,
          "test": "CHOLE",
          "result": "150",
          "TestslistId": 3,
          "Sectionorderlist": {
            "SectionresultId": 13,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 3,
            "testcode": "CHOLE",
            "testname": "Total Cholesterol",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "mg/dL",
            "Referencevalue": {
              "id": 2,
              "test": "CHOLE",
              "Male": "<200",
              "Female": "<200",
              "TestslistId": 3
            }
          }
        },
        {
          "id": 14,
          "test": "TRIG",
          "result": "150",
          "TestslistId": 4,
          "Sectionorderlist": {
            "SectionresultId": 14,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 4,
            "testcode": "TRIG",
            "testname": "Triglycerides",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "mg/dL",
            "Referencevalue": {
              "id": 3,
              "test": "TRIG",
              "Male": "<200",
              "Female": "<200",
              "TestslistId": 4
            }
          }
        },
        {
          "id": 15,
          "test": "HDL",
          "result": "60",
          "TestslistId": 5,
          "Sectionorderlist": {
            "SectionresultId": 15,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 5,
            "testcode": "HDL",
            "testname": "High Density Lipoprotein (HDL)",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "mg/dL",
            "Referencevalue": {
              "id": 4,
              "test": "HDL",
              "Male": ">40",
              "Female": ">40",
              "TestslistId": 5
            }
          }
        },
        {
          "id": 16,
          "test": "LDL",
          "result": "110",
          "TestslistId": 6,
          "Sectionorderlist": {
            "SectionresultId": 16,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 6,
            "testcode": "LDL",
            "testname": "Low Density Lipoprotein (LDL)",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "mg/dL",
            "Referencevalue": {
              "id": 5,
              "test": "LDL",
              "Male": "<130",
              "Female": "<130",
              "TestslistId": 6
            }
          }
        },
        {
          "id": 17,
          "test": "BUN",
          "result": "13",
          "TestslistId": 7,
          "Sectionorderlist": {
            "SectionresultId": 17,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 7,
            "testcode": "BUN",
            "testname": "Blood Urea Nitrogen",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "mg/dL",
            "Referencevalue": {
              "id": 6,
              "test": "BUN",
              "Male": "13-43",
              "Female": "13-43",
              "TestslistId": 7
            }
          }
        },
        {
          "id": 18,
          "test": "CREA",
          "result": "0.2",
          "TestslistId": 8,
          "Sectionorderlist": {
            "SectionresultId": 18,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 8,
            "testcode": "CREA",
            "testname": "Serum Creatinine",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "mg/dL",
            "Referencevalue": {
              "id": 7,
              "test": "CREA",
              "Male": "0.2-1.4",
              "Female": "0.2-1.4",
              "TestslistId": 8
            }
          }
        },
        {
          "id": 19,
          "test": "ALT/SGPT",
          "result": "40",
          "TestslistId": 9,
          "Sectionorderlist": {
            "SectionresultId": 19,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 9,
            "testcode": "ALT/SGPT",
            "testname": "Alanine Transaminase (ALT/SGPT)",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "U/L",
            "Referencevalue": {
              "id": 8,
              "test": "ALT/SGPT",
              "Male": "<45",
              "Female": "<34",
              "TestslistId": 9
            }
          }
        },
        {
          "id": 20,
          "test": "AST/SGOT",
          "result": "40",
          "TestslistId": 10,
          "Sectionorderlist": {
            "SectionresultId": 20,
            "SectionorderId": 4
          },
          "Testslist": {
            "id": 10,
            "testcode": "AST/SGOT",
            "testname": "Aspartate Aminotransferase (AST/SGOT)",
            "section": "Chemistry",
            "isPackage": false,
            "unit": "U/L",
            "Referencevalue": {
              "id": 9,
              "test": "AST/SGOT",
              "Male": "<50",
              "Female": "<35",
              "TestslistId": 10
            }
          }
        }
      ]
    }
  ]
}

Font.register({ family: 'arialbd', src: arialbd, fontStyle: 'normal', fontWeight: 'bold' });

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 15,
    paddingBottom: 100,
    paddingHorizontal: 35,
    alignItems: 'center'
  },
header:{
    width: 575.28,
    height: 100
  },
  wrap:{
    width: 575.28,
  },
companyHeader:{
    width: 575.28,
  },
  companyHText:{
    fontSize: '16px',
    textAlign: 'center'
  },
  contactText:{
    textAlign: 'center',
    fontSize: '8px'
  },
  marginTop:{
    marginTop: 2,
  },
  patientHeader:{
    flex: 1,
    flexDirection: 'row',
    width: 575.28,
    paddingLeft: '10px',
  },
  pcol:{
    width: 350,
  },
  pcol1:{
    width: 200,
  },
  patientInfoText:{
    fontSize: '9px',
  },
  resultBody:{
    width: 575.28,
    paddingLeft: '10px',
  },
  resultHeader:{
    fontFamily: 'arialbd',
    fontSize: '11px',
    fontWeight: "bold",
    width: 575.28
  },
  footer:{
    width: 575.28,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 29
  },
  footerCol:{
    width: 200,
  },
  footerCol1:{
    width: 200,
    height: 30,
  },
  footerText:{
    fontSize: '9px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerMessage:{
    position: 'absolute',
    fontSize: '9px',
    textAlign: 'center',
    fontWeight: 'bold',
    bottom: 29,
  },
  resTable:{
    width: 555.28,
  },
  resHText:{
    fontFamily: 'arialbd',
    fontSize: '10px',
    fontWeight: 'bold',
    width: 130,
    textAlign: 'center',
    borderBottom: '1px dotted black',
    borderTop: '1px dotted black',
    padding: 5
  },
  testNameHeader:{
    fontFamily: 'arialbd',
    fontSize: '10px',
    fontWeight: 'bold',
    width: 170,
    textAlign: 'center',
    borderBottom: '1px dotted black',
    borderTop: '1px dotted black',
    padding: 5
  },
  tableHeader:{
    width: 575.28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resTr:{
    width: 575.28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
   body:{
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
},
testName:{
  fontSize: '10px',
  fontWeight: 'bold',
  width: 170,
  padding: 2
},
trCenter:{
  fontSize: '10px',
  fontWeight: 'bold',
  width: 130,
  padding: 2,
  textAlign: 'center',
},
trCenterBold:{
  fontFamily: 'arialbd',
  fontSize: '10px',
  fontWeight: 'bold',
  width: 130,
  padding: 2,
  textAlign: 'center',
}
});

// Create Document Component
const ResultForm = () => (
<PDFViewer width="800px" height="500px" showToolbar={false}>
  <Document>
    <Page size="A5" orientation= "landscape" style={styles.page}>
      <View style={styles.wrap}>
        <View fixed={true} style={styles.header}>
          <View style={styles.companyHeader}>
            <Text style={styles.companyHText}>St. Camillus De Lellis General Hospital</Text>
            <Text style={styles.companyHText}>Laboratory Department</Text>
            <Text style={styles.contactText}>Telephone No.: 600-1125  |  e-mail: st.camillusdelellislab@yahoo.com</Text>
            <Text style={[styles.companyHText, styles.marginTop]}>Laboratory Report</Text>
          </View>
          <View style={styles.patientHeader}>
            <View style={styles.pcol}>
              <Text style={styles.patientInfoText}>Patient Name: {data.Patientlists[0].lastname}, {data.Patientlists[0].firstname} {data.Patientlists[0].middlename}</Text>
              <Text style={styles.patientInfoText}>Age/Gender: {data.Patientlists[0].age}/{data.Patientlists[0].gender}</Text>
              <Text style={styles.patientInfoText}>Requesting Physician: {data.reqDr}</Text>
            </View>

            <View style={styles.pcol1}>
              <Text style={styles.patientInfoText}>Date: {Moment(data.createdAt).format('MMMM DD, yyyy')}</Text>
              <Text style={styles.patientInfoText}>Paitent Type/Room: {data.ptType}</Text>
              <Text style={styles.patientInfoText}>Laboratory Number: {data.labNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.resultBody}>
          <Text fixed={true} style={styles.resultHeader}>Section</Text>
          
          <View style={styles.resTable}>
            
            <View style={styles.tableHeader} fixed={true}>
                <Text style={styles.testNameHeader}>Test Name</Text>
                <Text style={styles.resHText}>Result</Text>
                <Text style={styles.resHText}>Unit</Text>
                <Text style={styles.resHText}>Reference</Text>
            </View>
            {data.Sectionorders[0].Sectionresults.map((result, index) => {
              if(result.result === "!" || result.result === 0 || result.result === null){
                return (null)
              }else
              {
                return(
                    <View wrap={false} style={styles.resTr} key={index}>
                     {result.Testslist.isPackage === true && <Text style={styles.trCenterBold}>{result.Testslist.testname}</Text>}
                     {result.Testslist.isPackage === false && <Text style={styles.testName}>{result.Testslist.testname}</Text>}
                    <Text style={styles.trCenter}>{result.result}</Text>
                    {result.Testslist.isPackage === true && <Text style={styles.trCenter}></Text>}
                    {result.Testslist.isPackage === false && <Text style={styles.trCenter}>{result.Testslist.unit}</Text>}
                    {result.Testslist.Referencevalue == null &&  <Text style={styles.trCenter}></Text>}
                    {result.Testslist.Referencevalue !== null && data.Patientlists[0].gender === "Male" && <Text style={styles.trCenter}>{result.Testslist.Referencevalue.Male}</Text>}
                </View>)

              }
              )
            })}

            
            
            
          </View>
          
        </View>
      
      
      

        </View>
        <Text fixed={true} style={styles.footerMessage}>** Results are electronically printed. Physical signature is not necessary. **</Text>
        <View fixed={true} style={styles.footer}>
          <View style={styles.footerCol}>
            {/* IMAGE HERE FOR RMT */}
            <Text style={styles.footerText}>REGISTERED MEDICAL TECHNOLOGIST</Text>
          </View>

          <View style={styles.footerCol1}>
            {/* IMAGE HERE FOR PATHO SIG */}
          <Text style={styles.footerText}>PATHOLOGIST</Text>
          </View>
        </View>
    </Page>
      
  </Document>
</PDFViewer>
);

export default ResultForm;
