import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function App() {
  const [formattedContent, setFormattedContent] = useState("");

  useEffect(() => {
    const fetchLastContent = async () => {
      const { data, error } = await supabase
        .from("memoryBook")
        .select("contents")
        .order("num", { ascending: false }) // num이 가장 큰 순으로 정렬
        .limit(1); // 가장 큰 num 값을 가진 행 1개 가져오기
    
      if (error) {
        console.error("Error fetching last content:", error.message);
        return;
      }
    
      if (data?.length > 0) {
        setFormattedContent(
          data[0].contents.replace(/@/g, '\n').replace(/\/\//g, '\n\n')
        );
      }
    };
    
    

    fetchLastContent();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{formattedContent}</pre>
    </div>
  );
}

export default App;
