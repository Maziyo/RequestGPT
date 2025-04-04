import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function App() {
  const [formattedContent, setFormattedContent] = useState("");
  const dumi = "45.5@32.5@78.0@62.0@어느 날의 발견//PART01: <별일 아닌 것 같았는데 후회가 계속 밀려왔다. 할 일은 산더미 같았고> 길가에는 지치고 흩어진 사람들, 그 중 한 명은 <진로의 갈림길에서 선택의 무게를 느꼈다.> 마지막 인사조차 없이 떠나버린 할머니의 모습이 떠올랐다. <누군가의 말 한마디는 결정의 흐름을 바꾸곤 했다.> 그들의 지친 일상 속 <기억의 조각들이 자리 잡고 있었다.>  여름의 한 가운데, <슬픈 깨달음은 시간이 영원하지 않다는 것>. 사람들은 그렇게 떠나가고, 돌아오지 않는다. 압박감 속에서 순간의 선택이 미래로 이어진다는 것을 알면서도 <망치는 것처럼 느끼는 순간은 적지 않았다.> 주변의 지친 얼굴들이 계속 눈에 어른거렸다. <어둠 속에서 자신을 발견할 수 있을까?> 피곤함에 내리는 하늘을 보며, 그 속에서 답을 찾아보려고 했다.  //PART02: <도움이 되는 만남의 자리로 나아갔다.> 피곤했지만, 그곳에서 <생각지 못한 도움이 되었다는 것을 깨달았다.> 합톤에서 개발 업무 중인 그는, <아무도 예상치 못한 방법으로 사람들에게 기여하고 있었다.> <사랑하는 이들에게 위로의 편지를 건네며, 따뜻함 속에서 서로를 일으킬 힘을 느꼈다.>  옥상에서 고기를 구워 먹던 그날처럼, <순간의 행복은 현재의 태양과 함께했다.> 피곤하고 분주한 매일 속에서 <꿈이 실현되는 순간을 맛보며> 그들의 세상은 점점 더 밝게 빛났다. 모든 것이 연결되고 있음을 느꼈다. 처음부터 다시 시작할 수 있다면, 그들은 무엇을 바꾸고 싶을까?<어차피 지나간 시간들 역시 그들의 일부분이니까.>  //@기억의 주인들/쮸짜새얍얍/김마지/김마지/쮸짜새/미숑이/오야지/김연의/쮸짜아/쮸짜새짜새/합톤 여러분들 화이팅/여니/수진/멍게/리나짜세"
  const DUMI = dumi.replace(/@/g, '\n').replace(/\/\//g, '\n\n')

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
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1.8rem' }}>{formattedContent}</pre>
      <h1>******더미 데이터******</h1>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1.8rem' }}>${DUMI}</pre>
    </div>
  );
}

export default App;
