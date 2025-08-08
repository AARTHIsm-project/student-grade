const backendUrl = window.__BACKEND_URL__ || 'http://localhost:5000';

document.getElementById('getBtn').addEventListener('click', async () => {
  const roll = document.getElementById('rollInput').value.trim();
  if (!roll) return alert('Enter roll');
  try {
    const res = await fetch(`${backendUrl}/api/results/${roll}`);
    if (!res.ok) {
      document.getElementById('result').innerText = 'Not found';
      return;
    }
    const data = await res.json();
    document.getElementById('result').innerHTML = `
      <strong>${data.name} (Roll ${data.roll})</strong>
      <p>Math: ${data.marks.math} | Science: ${data.marks.science} | English: ${data.marks.english}</p>
    `;
  } catch (e) {
    document.getElementById('result').innerText = 'Error connecting to backend';
  }
});

document.getElementById('postBtn').addEventListener('click', async () => {
  const payload = {
    roll: document.getElementById('newRoll').value.trim(),
    name: document.getElementById('newName').value.trim(),
    marks: {
      math: Number(document.getElementById('mMath').value),
      science: Number(document.getElementById('mScience').value),
      english: Number(document.getElementById('mEnglish').value)
    }
  };
  try {
    const res = await fetch(`${backendUrl}/api/results`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      document.getElementById('postMsg').innerText = 'Added successfully';
    } else {
      document.getElementById('postMsg').innerText = data.error || 'Error';
    }
  } catch (e) {
    document.getElementById('postMsg').innerText = 'Error connecting to backend';
  }
});