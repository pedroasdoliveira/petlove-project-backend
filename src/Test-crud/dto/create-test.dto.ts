import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateTestDto {
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(5)
  @ApiProperty({
    description:
      'Conhecimento sistêmico da empresa. A capacidade da pessoa em conhecer e impactar os sistemas de tecnologia.',
    example: [
      'Você é capaz de implementar features simples e resolver pequenos bugs dentro da sua squad?',
      'Você desenha e implementa soluções de média e alta complexidade reduzindo débitos técnicos do time?',
      'Você é capaz de subir e controlar sistemas em produção e também monitora a qualidade olhando para SLAs?',
      'Você desenvolve arquitetura para futuras soluções e define SLAs?',
      'Você lidera as soluções técnicas com excelência e cria planos de contingências?',
    ],
  })
  system: string[];

  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(5)
  @ApiProperty({
    description:
      'Relacionamento da pessoa com outros dentro e fora da sua squad.',
    example: [
      'Você está sempre aprendendo com os outros e estuda mais quando necessário?',
      'Você sempre ajuda as pessoas do seu time a terem sucesso em seus desafios',
      'Você organiza times, promove feedbacks e intermedeia discussões',
      'Você mentora outros em seu desenvolvimento e já foi coach na construção de PDI',
      'Você gerencia carreiras, expectativas, performances e nível de engajamento do seu time',
    ],
  })
  person: string[];

  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(5)
  @ApiProperty({
    description:
      'Nível de engajamento da pessoa com os processos definidos pelo time de tecnologia.',
    example: [
      'Você segue todo o flow (git, CI/CD, Jira..) de desenvolvimento entregando features consistentes em produção?',
      'Você sugere mudanças nos flows com consistência, sempre procurando caminhos para melhorar',
      'Você sempre chama o time para reavaliar os flows, garantindo que todos entendam os benefícios e impactos',
      'Você é o responsável por ajustar os flows do time, escutando feedbacks e guiando através das mudanças',
      'Você define os flows baseado na maturidade, agilidade e disciplina do time',
    ],
  })
  process: string[];

  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(3)
  @ApiProperty({
    description:
      'A importância de testes e os tipos de testes são as coisas buscadas nesses níveis.',
    example: [
      'Você implementa teste unitário e também testa a sua solução manualmente considerando as definições do produto?',
      'Você simula comportamentos dos clientes no seu desenvolvimento, testa além do caminho feliz e analisa o impacto das mudanças',
      'Você implementa teste e2e, de integração que permita avaliar e monitorar o produto',
    ],
  })
  test: string;

  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(3)
  @ApiProperty({
    description: 'Abrangerá os princípios de Design de cada chapter.',
    example: [
      'Você conhece e aplica os princípios do S.O.L.I.D (Ou algum outro pattern definido pelo seu chapter Manager) no seu código?',
      'Você conhece e aplica pelo menos outros 3 princípios de pattern no seu código e ajuda seus colegas de time a escolherem qual o melhor para a solução do problema',
      'Você já ajudou a definir padrões de projetos de times/produtos fora do seu time',
    ],
  })
  design: string[];

  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(3)
  @ApiProperty({
    description: 'Abordará temas como CI/CD e Código Limpo.',
    example: [
      'Você conhece o conceito de código limpo (link)? Aplica o conceito em pelo menos 50% do seu código? Conhece e desenvolve seguindo os nossos processos de CI/CD?https://petlove.atlassian.net/wiki/spaces/TEC/pages/351666200/Playbook',
      'Você Constrói códigos modulares e segue os conceitos de código limpo em 80% do seu código?',
      'Você ajuda a definir processos de CI/CD do seu time e da sua área? Ensina seus colegas a importância de um código limpo e cobra isso nos PRs que revisa?',
    ],
  })
  toolshop: string[];

  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(3)
  @ApiProperty({
    description:
      'A capacidade da pessoa em estabelecer e difundir os fundamentos computacionais e, através deles, melhorar a qualidade do código são os atributos buscados nessa vertente.',
    example: [
      'Você Conhece e aplica estruturas de dados e multithreading?',
      'Você consegue desenhar a arquitetura de um sistema de complexidade média a alta',
      'Você consegue desenhar uma arquitetura multis sistêmica e para múltiplos times',
    ],
  })
  computationalFundamentals: string[];
}
