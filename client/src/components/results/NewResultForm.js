const Quixote = () => (
  <Document>
    <Page size="Letter" style={styles.body}>
      <View style={styles.header} fixed>
        <Text style={styles.companyText}>St. Camillus De Lellis General Hospital</Text>
        <Text style={styles.companyContacts}>Gomburza cor. Z. Flores Sts. Brgy. 6 San Agustin, Laoag City</Text>
        <Text style={styles.companyContacts}>Cellphone No.: 0961 366 8271 | Telephone No.: 600-1125  |  e-mail: st.camillusdelellislab@yahoo.com</Text>
        <Text style={styles.companyText}>Laboratory Report</Text>   
      </View>
      
      <View style={styles.patientHeader} fixed>
        <View style={styles.column}>
          <Text style={styles.patientInfo}>Patient Name: </Text>
          <Text style={styles.patientInfo}>Age/Gender: </Text>
          <Text style={styles.patientInfo}>Requesting Physician: </Text>
        </View>
        
        <View style={styles.column1}>
          <Text style={styles.patientInfo}>Date:</Text>
          <Text style={styles.patientInfo}>Patient Type/Room No.: </Text>
          <Text style={styles.patientInfo}>Laboratory Number: </Text>
        </View>
      </View>
      
      
      <View style={styles.resultHeader} fixed>
          <Text style={styles.testName}>Test Name</Text>
          <Text style={styles.resultText}>Result</Text>
          <Text style={styles.unitText}>Unit</Text>
         <Text style={styles.referenceText}>Reference</Text>
      </View>
      
  
         
         
          <View style={styles.sectionBody}>
              <Text style={styles.sectiontext}>CHEMISTRY</Text>
          </View>

          <View style={styles.resultBody}>
              <Text style={styles.testName}>Fasting Blood Sugar</Text>
              <Text style={styles.resultText}>80</Text>
              <Text style={styles.unitText}>mg/dL</Text>
              <Text style={styles.referenceText}>70-120</Text>
          </View>

          <View style={styles.sectionBody}>
              <Text style={styles.sectiontext}>Lipid Profile</Text>
          </View>
          <View>
              <Text style={styles.sectiontext}>Comment:</Text>
              <Text style={styles.sectiontext}>*Limitation: Specimen with alkaline pH, elevated pus, menstrual blood, or vaginal discharge may cause high albumin result.Diagnosis should not be based on a single test method or test result.</Text>
      		  <Text style={styles.sectiontext}> </Text>   
             <Text style={styles.sectiontext}>*Clinical Determination:</Text>   
              <Text style={styles.sectiontext}>No Microalbumin: 0-29</Text>    
              <Text style={styles.sectiontext}>Clinical Microalbuminuria: 30-300</Text>  
              <Text style={styles.sectiontext}>Macroalbuminuria: greater than 300 </Text>        
         </View>
     
      
      
      
      
      <View style={styles.footer} fixed>
        <View style={styles.column}>
          <Text style={styles.footerText}>Name</Text>
          <Text style={styles.footerText}>REGISTERED MEDICAL TECHNOLOGIST</Text>
          <Text style={styles.footerText}>License No.: _____</Text>
        </View>
        
        <View style={styles.column}>
          <Text style={styles.footerText}>Modesty A. Leaño, MD, FSPS</Text>
          <Text style={styles.footerText}>ANATOMIC AND CLINICAL PATHOLOGIST</Text>
          <Text style={styles.footerText}>License No: 98717</Text>
        </View>
      </View>
      
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 100,
    paddingHorizontal: 35,
  },
  header:{
    textAlign: 'center',
  },
  companyText:{
    fontSize: 14,
    fontFamily: 'Helvetica-Bold'
  },
  companyContacts:{
    fontSize: 9
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
    fontSize: '11px'
  },
  footerText:{
    fontSize: '10px',
    textAlign: 'center',
  }
  ,
  footer:{
    position: 'absolute',
    bottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  
  resultHeader:{
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    marginTop: 15,
    marginBottom: 10,
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
     fontSize: '11px',
     borderBottom: '1px dotted black',
  },
  sectionBody:{
    borderBottom: '1px dotted black',
  }
  ,
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
    fontSize: '11px',
  },
logo:{
  width: "55px",
  position: 'absolute',
  left: "10px",
  bottom: "5px"
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
}
});

ReactPDF.render(<Quixote />);
