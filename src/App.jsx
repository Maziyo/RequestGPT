import { useEffect, useState } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [formattedContent, setFormattedContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastContent = async () => {
      const { data, error } = await supabase
        .from("memoryBook")
        .select("contents");

      if (error) {
        console.error("Error fetching last content:", error.message);
        setError(error);
      } else if (data && data.length > 0) {
        const last = data[data.length-0]; // 배열의 마지막 항목
        console.log("Last content:", last.contents);

        const formattedText = last.contents
          .replace(/@/g, '\n')
          .replace(/\/\//g, '\n\n');

        setFormattedContent(formattedText);
      }
    };

    fetchLastContent();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      <pre style={{ whiteSpace: 'pre-wrap' }}>{formattedContent}</pre>
    </div>
  );
}

export default App;
