// Firebase config here
const firebaseConfig = {
    apiKey: "AIzaSyArifE1pLhrx7GLwLTSzSYG-TISa-nzzfI",
    authDomain: "studynotesapp-b9809.firebaseapp.com",
    projectId: "studynotesapp-b9809",
    storageBucket: "studynotesapp-b9809.firebasestorage.app",
    messagingSenderId: "390921766322",
    appId: "1:390921766322:web:143b7533995a543d6750ab",
    measurementId: "G-5M31FJ5W6B"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  const subjectList = document.getElementById("subject-list");
  
  // Fetch subjects and display notes
  db.collection("notes").get().then((querySnapshot) => {
    const subjects = {};
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!subjects[data.subject]) subjects[data.subject] = [];
      subjects[data.subject].push(data);
    });
  
    for (let subject in subjects) {
      const section = document.createElement("div");
      section.innerHTML = `<h2>${subject}</h2>`;
      
      subjects[subject].forEach(note => {
        const link = document.createElement("a");
        link.href = note.url;
        link.textContent = note.title;
        link.target = "_blank";
        section.appendChild(link);
        section.appendChild(document.createElement("br"));
      });
  
      subjectList.appendChild(section);
    }
  });
  