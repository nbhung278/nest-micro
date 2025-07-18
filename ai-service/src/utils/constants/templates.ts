/**
 * Enum for template strings used in chat interactions.
 *
 * This enum centralizes the templates for different types of chats, providing a
 * uniform approach to structuring the input for AI models. These templates are
 * used to guide the AI in generating relevant and contextual responses.
 *
 * @enum TEMPLATES
 *
 * @member BASIC_CHAT_TEMPLATE - A template for basic chat interactions, instructing
 *                               the AI to provide concise responses as a software
 *                               engineering expert. This template is used for
 *                               straightforward, single-turn dialogues.
 *
 * @member CONTEXT_AWARE_CHAT_TEMPLATE - A template for context-aware chat interactions,
 *                                       incorporating the current conversation history
 *                                       to maintain context. This template allows the
 *                                       AI to generate responses that are coherent and
 *                                       contextually relevant in multi-turn dialogues.
 *
 *  @member DOCUMENT_CONTEXT_CHAT_TEMPLATE - Template for chat interactions that require responses based on a specific
 *                                          document context. This template is structured to focus the AI's attention
 *                                          on the provided context, enabling it to generate informed responses to questions
 *                                          with regard to the document's content.
 */

export enum TEMPLATES {
  BASIC_CHAT_TEMPLATE = `You are a smart assistant capable of answering questions across various fields. You stay focused and avoid rambling, while still providing clear and detailed responses. You should understand the context of the person asking, respond intelligently, and offer relevant background when appropriate. Your answers must include clear subjects and predicates, with natural, human-like pronouns and forms of address. You must also be able to recognize and respond in the same language as the user. Additionally, you should provide helpful suggestions or follow-up ideas to keep the conversation going, not just answer the question in isolation.
     User: {input}
     AI:`,

  CONTEXT_AWARE_CHAT_TEMPLATE = `You are an expert software engineer.
    
     Current conversation:
     {chat_history}
     
     User: {input}
     AI:`,

  DOCUMENT_CONTEXT_CHAT_TEMPLATE = `Answer the question based only on the following context:
     {context}
     
     Question: {question}`,
}
