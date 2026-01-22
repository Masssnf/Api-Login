import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hashTampil, setHashTampil] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Simpan hash dari backend ke state
        setHashTampil(data.hash_asli); 
        alert("Login Sukses!");
      } else {
        alert("Login Gagal!");
        setHashTampil(""); 
      }
    } catch {
      alert("Error: Pastikan Backend Go sudah jalan!");
    }
  };

  
  const styles = {
    container: {
      display: 'flex',          
      justifyContent: 'center', 
      alignItems: 'center',     
      minHeight: '100vh',       
      backgroundColor: '#f0f2f5', 
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Efek bayangan
      width: '350px',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      boxSizing: 'border-box' // Agar padding tidak merusak lebar input
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '10px'
    },
    hashBox: {
      marginTop: '20px', 
      background: '#ffe6e6', 
      padding: '15px', 
      borderRadius: '5px',
      border: '1px solid #ffcccc',
      textAlign: 'left'
    }
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.card}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
        
        <form onSubmit={handleLogin}>
          <div style={{ textAlign: 'left', marginBottom: '5px', fontSize: '14px' }}>Username</div>
          <input 
            placeholder="Contoh: admin" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            style={styles.input}
          />

          <div style={{ textAlign: 'left', marginBottom: '5px', fontSize: '14px' }}>Password</div>
          <input 
            type="password" 
            placeholder="Contoh: 12345" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input}
          />
          
          <button type="submit" style={styles.button}>Masuk</button>
        </form>

        {hashTampil && (
          <div style={styles.hashBox}>
            <h4 style={{ margin: '0 0 10px 0', color: '#cc0000' }}>Bukti Enkripsi (Bcrypt):</h4>
            <code style={{ wordBreak: 'break-all', color: '#d63384', fontSize: '12px' }}>
              {hashTampil}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;