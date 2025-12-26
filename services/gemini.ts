
import { GoogleGenAI } from "@google/genai";

export async function getHealthInsights(stats: any) {
  try {
    // Criar a instância dentro da função garante que usamos a chave de API mais recente
    // e evita falhas se o objeto 'process' não estiver totalmente pronto no carregamento inicial.
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    const ai = new GoogleGenAI({ apiKey: apiKey || '' });
    
    const prompt = `Analise os seguintes dados de um usuário tentando parar de fumar:
    - Cigarros fumados hoje: ${stats.today || 0}
    - Total no mês: ${stats.month || 0}
    - Dinheiro economizado: R$ ${stats.moneySaved?.toFixed(2) || '0.00'}
    - Vida recuperada: ${Math.floor(stats.lifeRegained / 60) || 0} horas
    
    Crie um insight curto (máximo 150 caracteres), motivador e baseado em evidências de saúde para incentivá-lo a continuar ou reduzir o consumo. Responda apenas com o texto do insight.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Continue focado! Cada cigarro evitado é uma vitória para seus pulmões.";
  } catch (error) {
    console.error("Erro ao obter insights do Gemini:", error);
    return "Mantenha o foco! Reduzir o consumo melhora sua circulação em poucas semanas.";
  }
}
