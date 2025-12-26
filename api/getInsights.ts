
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Esta função é o seu novo backend seguro.
// A chave da API do Gemini deve ser configurada como uma variável de ambiente no painel da Vercel.
// Ex: API_KEY = "sua_chave_aqui"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Apenas permitir requisições POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Apenas requisições POST são permitidas.' });
  }

  try {
    const stats = request.body.stats;

    // Validar se os dados foram recebidos
    if (!stats) {
      return response.status(400).json({ message: 'Dados de estatísticas (stats) são obrigatórios.' });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // Esta verificação de erro é importante para o diagnóstico no servidor
      throw new Error("A variável de ambiente API_KEY não foi encontrada.");
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-preview"});

    const prompt = `Analise os seguintes dados de um usuário tentando parar de fumar:
    - Cigarros fumados hoje: ${stats.today || 0}
    - Total no mês: ${stats.month || 0}
    - Dinheiro economizado: R$ ${stats.moneySaved?.toFixed(2) || '0.00'}
    - Vida recuperada: ${Math.floor(stats.lifeRegained / 60) || 0} horas
    
    Crie um insight curto (máximo 150 caracteres), motivador e baseado em evidências de saúde para incentivá-lo a continuar ou reduzir o consumo.
    Seja como um coach de saúde: positivo e encorajador.
    Responda apenas com o texto do insight.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Enviar a resposta de volta para o frontend
    return response.status(200).json({ insight: text });

  } catch (error) {
    console.error("Erro na função serverless getInsights:", error);
    const errorMessage = error instanceof Error ? error.message : "Um erro desconhecido ocorreu.";
    
    // Enviar uma mensagem de erro clara para o frontend
    return response.status(500).json({ message: "Erro ao gerar o insight.", error: errorMessage });
  }
}
