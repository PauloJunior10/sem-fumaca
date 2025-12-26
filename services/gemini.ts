

/**
 * Busca insights de saúde do nosso próprio backend (função serverless),
 * que por sua vez chama a API do Gemini de forma segura.
 * @param stats - As estatísticas de fumo do usuário.
 * @returns Uma string com o insight gerado.
 */
export async function getHealthInsights(stats: any): Promise<string> {
  try {
    const response = await fetch('/api/getInsights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stats }),
    });

    if (!response.ok) {
      // Se a resposta do nosso backend não for OK, lança um erro
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao buscar insights do servidor.');
    }

    const data = await response.json();
    return data.insight || "Continue focado! Cada cigarro evitado é uma vitória para seus pulmões.";

  } catch (error) {
    console.error("Erro ao obter insights do nosso backend:", error);
    // Retorna uma mensagem padrão em caso de falha de rede ou erro do servidor
    return "Mantenha o foco! Reduzir o consumo melhora sua circulação em poucas semanas.";
  }
}

