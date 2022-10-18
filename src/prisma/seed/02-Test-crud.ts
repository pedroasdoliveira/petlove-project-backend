import { Prisma, PrismaClient } from "@prisma/client";

export const test: Prisma.TestCreateInput[] = [
	{
    title:'proeficiencia',

		system:[
      'Você é capaz de implementar features simples e resolver pequenos bugs dentro da sua squad?',
      'Você desenha e implementa soluções de média e alta complexidade reduzindo débitos técnicos do time?',
      'Você é capaz de subir e controlar sistemas em produção e também monitora a qualidade olhando para SLAs?',
      'Você desenvolve arquitetura para futuras soluções e define SLAs?',
      'Você lidera as soluções técnicas com excelência e cria planos de contingências?'
    ],
    person:[
      'Você está sempre aprendendo com os outros e estuda mais quando necessário?',
      'Você sempre ajuda as pessoas do seu time a terem sucesso em seus desafios',
      'Você organiza times, promove feedbacks e intermedeia discussões',
      'Você mentora outros em seu desenvolvimento e já foi coach na construção de PDI',
      'Você gerencia carreiras, expectativas, performances e nível de engajamento do seu time'
    ],
    test:[
      'Você implementa teste unitário e também testa a sua solução manualmente considerando as definições do produto?',
      'Você simula comportamentos dos clientes no seu desenvolvimento, testa além do caminho feliz e analisa o impacto das mudanças',
      'Você implementa teste e2e, de integração que permita avaliar e monitorar o produto'
    ],
    design:[
      'Você conhece e aplica os princípios do S.O.L.I.D (Ou algum outro pattern definido pelo seu chapter Manager) no seu código?',
      'Você conhece e aplica pelo menos outros 3 princípios de pattern no seu código e ajuda seus colegas de time a escolherem qual o melhor para a solução do problema',
      'Você já ajudou a definir padrões de projetos de times/produtos fora do seu time'
    ],
    toolshop:[
      'Você conhece o conceito de código limpo (link) e aplica o conceito em pelo menos 50% do seu código. Conhece e desenvolve seguindo os nossos processos de CI/CD?',
      'Você Constrói códigos modulares e segue os conceitos de código limpo em 80% do seu código',
      'Você ajuda a definir processos de CI/CD do seu time e da sua área. Ensina seus colegas a importância de um código limpo e cobra isso nos PRs que revisa'
    ],
    process:[
      'Você segue todo o flow (git, CI/CD, Jira..) de desenvolvimento entregando features consistentes em produção?',
      'Você sugere mudanças nos flows com consistência, sempre procurando caminhos para melhorar',
      'Você sempre chama o time para reavaliar os flows, garantindo que todos entendam os benefícios e impactos',
      'Você é o responsável por ajustar os flows do time, escutando feedbacks e guiando através das mudanças',
      'Você define os flows baseado na maturidade, agilidade e disciplina do time'
    ],
    computationalFundamentals:[
      'Você Conhece e aplica estruturas de dados e multithreading?',
      'Você consegue desenhar a arquitetura de um sistema de complexidade média a alta',
      'Você consegue desenhar uma arquitetura multis sistêmica e para múltiplos times'
    ]
	},
];

export const Tests = async (prisma: PrismaClient) => {
	for (const obj of Object.values(test)) {
		await prisma.test.upsert({
			where: { title: obj.title },
			update: {},
			create: {
				...obj,
			},
		});
	}
};
