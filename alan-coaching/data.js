// ============================================================
// ALAN COACHING — Conteúdo dinâmico
// ============================================================

const CLIPS = [
  { title: "Como ler rotações em Ascent", platform: "YouTube", category: "estrategias", duration: "12:04" },
  { title: "Ace clutch 1vs4 no Bind", platform: "Twitch", category: "highlights", duration: "1:32" },
  { title: "Sessão de coaching — corrigindo posicionamento", platform: "YouTube", category: "coaching", duration: "24:18" },
  { title: "Execução de bombsite B em Haven", platform: "TikTok", category: "estrategias", duration: "0:58" },
  { title: "Ranked gameplay — Radiante lobby", platform: "Twitch", category: "gameplays", duration: "38:40" },
  { title: "Retake perfeito no site A de Split", platform: "YouTube", category: "highlights", duration: "1:05" },
  { title: "Análise de VOD — erros de econômica", platform: "YouTube", category: "coaching", duration: "18:52" },
  { title: "Aim training — rotina diária", platform: "TikTok", category: "gameplays", duration: "1:12" },
  { title: "Pós-plant 1vs2 em Lotus", platform: "Twitch", category: "highlights", duration: "0:47" },
];

const STRATEGIES = [
  { code: "MAPA // 01", title: "Guias por Mapa", desc: "Rotas, timings e controle de área para cada mapa do pool competitivo.",
    body: "Cada mapa exige leituras diferentes de tempo, som e controle de área. Este guia cobre timings de rotação, pontos de controle prioritários e como adaptar o ritmo do time conforme o mapa em jogo, do pistol round até o mid-round." },
  { code: "AGENTE // 02", title: "Guias por Agente", desc: "Kits, combos de habilidades e função tática de cada agente.",
    body: "Entenda o papel de cada agente dentro do sistema tático do time: iniciadores abrindo espaço, controladores fechando linhas de visão, sentinelas segurando flancos e duelistas criando vantagem numérica no primeiro contato." },
  { code: "MOV // 03", title: "Posicionamentos", desc: "Ângulos seguros, crossfires e leitura de risco em cada round.",
    body: "Posicionamento é a diferença entre vencer e perder um duelo antes mesmo dele acontecer. Este guia ensina a montar crossfires eficientes, evitar ângulos duplos desnecessários e adaptar sua posição conforme a informação disponível." },
  { code: "ATK // 04", title: "Execuções", desc: "Padrões de entrada coordenada para tomar um site com segurança.",
    body: "Uma execução bem-feita reduz a exposição do time e força decisões rápidas do lado defensivo. Aqui você aprende a estruturar utilitário, ordem de entrada e comunicação para tomadas de site consistentes." },
  { code: "DEF // 05", title: "Retakes", desc: "Como reorganizar o time e retomar um site perdido.",
    body: "Retakes exigem informação precisa e uso eficiente de utilitário remanescente. O guia cobre leitura de plant, sincronização de entrada e prioridades de troca para recuperar o bombsite com o menor custo possível." },
  { code: "DEF // 06", title: "Pós-Plant", desc: "Cenários de vantagem numérica após a plantada da bomba.",
    body: "Depois do plant, o objetivo muda: sobreviver ao tempo é suficiente. Este guia mostra como usar utilitário para negar informação, segurar ângulos de longe e fechar o round sem expor desnecessariamente o time." },
  { code: "ECO // 07", title: "Economia", desc: "Quando comprar, forçar ou economizar para manter vantagem.",
    body: "Gestão de economia decide o ritmo da partida. Aprenda a calcular buy rounds, identificar force buys do adversário e planejar economias que não comprometam os próximos três rounds." },
  { code: "COM // 08", title: "Comunicação", desc: "Callouts eficientes e fluxo de informação dentro do time.",
    body: "Comunicação clara evita decisões tardias. O guia apresenta um padrão de callouts objetivos, prioridade de informação (quem fala primeiro e o quê) e como manter o comms limpo sob pressão." },
];

const TESTIMONIALS = [
  { name: "Rafael M.", before: "Prata", after: "Ascendente", quote: "O coaching do Alan mudou completamente minha leitura de jogo. Em dois meses saí da Prata e cheguei na Ascendente." },
  { name: "Bianca S.", before: "Ouro", after: "Imortal", quote: "Nunca tinha tido um feedback tão direto e específico sobre meus erros. A análise de VOD foi o divisor de águas." },
  { name: "Kauê L.", before: "Diamante", after: "Imortal", quote: "As sessões ao vivo aceleraram muito minha tomada de decisão em round crítico. Recomendo demais." },
  { name: "Marina T.", before: "Bronze", after: "Platina", quote: "Comecei sem saber nada de tática e hoje jogo com muito mais confiança em qualquer mapa." },
  { name: "Diego A.", before: "Platina", after: "Ascendente", quote: "O plano Ouro valeu cada centavo. Acompanhamento contínuo faz toda a diferença na consistência." },
];

const SCHEDULE = {
  "Segunda": ["09:00", "14:00", "19:00", "21:00"],
  "Quarta": ["10:00", "15:00", "20:00"],
  "Sexta": ["09:00", "13:00", "18:00", "21:00"],
  "Sábado": ["11:00", "16:00", "19:00"],
};
