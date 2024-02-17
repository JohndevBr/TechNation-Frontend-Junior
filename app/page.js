'use client'
import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import { FaChartLine } from "react-icons/fa";
import { Container, HeaderContainer, SumaryContainer, NotesContainer, ChartContainer } from "./styles";

export default function Home() {
  const [notas, setNotas] = useState([
    {
      pagador: "Empresa A",
      numeroNota: "001",
      dataEmissao: "2023-01-15",
      dataCobranca: "2023-02-15",
      dataPagamento: "2023-03-15",
      valorNota: 1000,
      documentoNotaFiscal: "ABC123",
      documentoBoleto: "XYZ456",
      status: "Pagamento realizado"
    },
    {
      pagador: "Empresa B",
      numeroNota: "002",
      dataEmissao: "2023-02-10",
      dataCobranca: "2023-03-10",
      dataPagamento: "2023-04-10",
      valorNota: 1500,
      documentoNotaFiscal: "DEF456",
      documentoBoleto: "LMN789",
      status: "Pagamento realizado"
    },
    {
      pagador: "Empresa C",
      numeroNota: "003",
      dataEmissao: "2023-09-10",
      dataCobranca: "2023-10-10",
      dataPagamento: "",
      valorNota: 500,
      documentoNotaFiscal: "JKL456",
      documentoBoleto: "OPQ123",
      status: "Pagamento em atraso"
    },
    {
      pagador: "Empresa D",
      numeroNota: "004",
      dataEmissao: "2023-05-03",
      dataCobranca: "2023-06-03",
      dataPagamento: "",
      valorNota: 200,
      documentoNotaFiscal: "ING456",
      documentoBoleto: "ABC123",
      status: "Pagamento em atraso"
    },
    {
      pagador: "Empresa E",
      numeroNota: "005",
      dataEmissao: "2023-01-15",
      dataCobranca: "2023-02-15",
      dataPagamento: "",
      valorNota: 200,
      documentoNotaFiscal: "UVW789",
      documentoBoleto: "HIJ456",
      status: "Pagamento em atraso"
    },
    {
      pagador: "Empresa F",
      numeroNota: "006",
      dataEmissao: "2023-04-15",
      dataCobranca: "2023-05-15",
      dataPagamento: "",
      valorNota: 500,
      documentoNotaFiscal: "UVW789",
      documentoBoleto: "JKA592",
      status: "Cobrança realizada"
    }, {
      pagador: "Empresa G",
      numeroNota: "007",
      dataEmissao: "2023-10-22",
      dataCobranca: "2023-11-22",
      dataPagamento: "",
      valorNota: 500,
      documentoNotaFiscal: "UVW789",
      documentoBoleto: "TYU592",
      status: "Cobrança realizada"
    },
    {
      pagador: "Empresa H",
      numeroNota: "008",
      dataEmissao: "2023-10-22",
      dataCobranca: "2023-11-22",
      dataPagamento: "",
      valorNota: 500,
      documentoNotaFiscal: "GTR789",
      documentoBoleto: "BUC592",
      status: "Emitida",
    },
    {
      pagador: "Empresa AA",
      numeroNota: "009",
      dataEmissao: "2023-01-15",
      dataCobranca: "2023-02-15",
      dataPagamento: "2023-02-10",
      valorNota: 1000,
      documentoNotaFiscal: "B2C123",
      documentoBoleto: "F2G456",
      status: "Pagamento realizado"
    },
    {
      pagador: "Empresa AB",
      numeroNota: "010",
      dataEmissao: "2023-03-05",
      dataCobranca: "2023-05-10",
      dataPagamento: "2023-05-10",
      valorNota: 1000,
      documentoNotaFiscal: "IMA123",
      documentoBoleto: "GAC456",
      status: "Pagamento realizado"
    },
    {
      pagador: "Empresa AC",
      numeroNota: "011",
      dataEmissao: "2023-05-05",
      dataCobranca: "2023-06-10",
      dataPagamento: "2023-06-10",
      valorNota: 1000,
      documentoNotaFiscal: "CRE123",
      documentoBoleto: "BAC456",
      status: "Pagamento realizado"
    },
    {
      pagador: "Empresa AD",
      numeroNota: "012",
      dataEmissao: "2023-05-05",
      dataCobranca: "2023-06-10",
      dataPagamento: "2023-06-10",
      valorNota: 1000,
      documentoNotaFiscal: "AME123",
      documentoBoleto: "MSA456",
      status: "Pagamento realizado"
    },
    {
      pagador: "Empresa AE",
      numeroNota: "013",
      dataEmissao: "2024-01-05",
      dataCobranca: "2024-02-10",
      dataPagamento: "2024-02-10",
      valorNota: 1000,
      documentoNotaFiscal: "BKA123",
      documentoBoleto: "TGR456",
      status: "Pagamento realizado"
    },
  ]);
  const [anoSelecionado, setAnoSelecionado] = useState('');
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [trimestreSelecionado, setTrimestreSelecionado] = useState('');
  const [totalNotasEmitidas, setTotalNotasEmitidas] = useState(0);
  const [totalNotasSemCobranca, setTotalNotasSemCobranca] = useState(0);
  const [totalNotasVencidas, setTotalNotasVencidas] = useState(0);
  const [totalNotasAVencer, setTotalNotasAVencer] = useState(0);
  const [totalNotasPagas, setTotalNotasPagas] = useState(0);
  const [receitaMensal, setReceitaMensal] = useState({});
  const [inadimplenciaMensal, setInadimplenciaMensal] = useState({});
  const [filtroMesEmissao, setFiltroMesEmissao] = useState('');
  const [filtroMesCobranca, setFiltroMesCobranca] = useState('');
  const [filtroMesPagamento, setFiltroMesPagamento] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  const calcularValorTotal = (notas, status) => {
    return notas
      .filter(nota => status ? nota.status === status : true)
      .reduce((total, nota) => total + nota.valorNota, 0);
  };

  useEffect(() => {
    const calcularMetricasEAtualizar = () => {
      let notasFiltradas = notas;
      if (anoSelecionado) {
        notasFiltradas = notasFiltradas.filter(nota => nota.dataEmissao.startsWith(anoSelecionado));
      }
      if (mesSelecionado) {
        notasFiltradas = notasFiltradas.filter(nota => nota.dataEmissao.slice(5, 7) === mesSelecionado);
      }
      if (trimestreSelecionado) {
        const [ano, trimestre] = trimestreSelecionado.split('-');
        const mesInicial = trimestre === '1' ? '01' : trimestre === '2' ? '04' : trimestre === '3' ? '07' : '10';
        const mesFinal = trimestre === '1' ? '03' : trimestre === '2' ? '06' : trimestre === '3' ? '09' : '12';
        notasFiltradas = notasFiltradas.filter(nota => {
          const mesNota = nota.dataEmissao.slice(5, 7);
          return nota.dataEmissao.startsWith(ano) && mesNota >= mesInicial && mesNota <= mesFinal;
        });
      }

      const totalEmitidas = calcularValorTotal(notasFiltradas, "");
      setTotalNotasEmitidas(totalEmitidas);

      const totalSemCobranca = calcularValorTotal(notasFiltradas, "Emitida");
      setTotalNotasSemCobranca(totalSemCobranca);

      const totalVencidas = calcularValorTotal(notasFiltradas, "Pagamento em atraso");
      setTotalNotasVencidas(totalVencidas);

      const totalAVencer = calcularValorTotal(notasFiltradas.filter(nota => nota.status !== "Pagamento realizado"), "Cobrança realizada");
      setTotalNotasAVencer(totalAVencer);

      const totalPagas = calcularValorTotal(notasFiltradas.filter(nota => nota.status === "Pagamento realizado"), "Pagamento realizado");
      setTotalNotasPagas(totalPagas);

      const receitaMensalAnoMes = {};
      notasFiltradas.forEach(nota => {
        const dataPagamento = nota.dataPagamento;
        if (dataPagamento) {
          const mesAno = dataPagamento.slice(0, 7);
          receitaMensalAnoMes[mesAno] = receitaMensalAnoMes[mesAno] ? receitaMensalAnoMes[mesAno] + nota.valorNota : nota.valorNota;
        }
      });
      setReceitaMensal(receitaMensalAnoMes);

      const inadimplenciaMensalAnoMes = {};
      notasFiltradas.forEach(nota => {
        const dataCobranca = nota.dataCobranca;
        const dataPagamento = nota.dataPagamento;
        if (dataCobranca && !dataPagamento) {
          const mesAno = dataCobranca.slice(0, 7);
          inadimplenciaMensalAnoMes[mesAno] = inadimplenciaMensalAnoMes[mesAno] ? inadimplenciaMensalAnoMes[mesAno] + nota.valorNota : nota.valorNota;
        }
      });
      setInadimplenciaMensal(inadimplenciaMensalAnoMes);
    };

    calcularMetricasEAtualizar();
  }, [notas, anoSelecionado, mesSelecionado, trimestreSelecionado]);


  const handleSelecionarAno = (ano) => {
    setAnoSelecionado(ano === anoSelecionado ? '' : ano);
  };

  const handleSelecionarMes = (mes) => {
    setMesSelecionado(prevMes => prevMes === mes ? '' : mes);
  };

  const handleSelecionarTrimestre = (trimestre) => {
    setTrimestreSelecionado(prevTrimestre => prevTrimestre === trimestre ? '' : trimestre);
  };

  const options = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: Object.keys(receitaMensal),
    }
  };

  const series = [
    {
      name: "Receita Mensal",
      data: Object.values(receitaMensal)
    }
  ];

  const optionsInadimplencia = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: Object.keys(inadimplenciaMensal),
    },

  };

  const seriesInadimplencia = [
    {
      name: "Inadimplência Mensal",
      data: Object.values(inadimplenciaMensal)
    }
  ];

  const notasFiltradas = notas.filter(nota => {
    const filtroMesEmissaoPassou = !filtroMesEmissao || nota.dataEmissao.slice(0, 7) === filtroMesEmissao;
    const filtroMesCobrancaPassou = !filtroMesCobranca || nota.dataCobranca.slice(0, 7) === filtroMesCobranca;
    const filtroMesPagamentoPassou = !filtroMesPagamento || nota.dataPagamento.slice(0, 7) === filtroMesPagamento;
    const filtroStatusPassou = !filtroStatus || nota.status === filtroStatus;
    return filtroMesEmissaoPassou && filtroMesCobrancaPassou && filtroMesPagamentoPassou && filtroStatusPassou;
  });

  const mesesEmissaoDisponiveis = [...new Set(notas.map(nota => nota.dataEmissao.slice(0, 7)))];
  const mesesCobrancaDisponiveis = [...new Set(notas.map(nota => nota.dataCobranca.slice(0, 7)))];
  const mesesPagamentoDisponiveis = [...new Set(notas.filter(nota => nota.status === 'Pagamento realizado' && nota.dataPagamento).map(nota => nota.dataPagamento.slice(0, 7)))];
  const statusDisponiveis = [...new Set(notas.map(nota => nota.status))];

  return (
    <Container>
      <HeaderContainer>
        <div>
          <h1>Dashboard</h1>
        </div>
        <div className="userContainer">
          <div className="avatar">
            <p>JC</p>
          </div>
          <div className="userName">
            <p>JOAO CLAUDIO</p>
            <span>User ADMIN</span>
          </div>
        </div>
      </HeaderContainer>

      <div className="filterContainer">
        {notas.length > 0 && (
          <div className="filtroAno">
            {Array.from(new Set(notas.map(nota => nota.dataEmissao.slice(0, 4)))).map(ano => (
              <button
                key={ano}
                onClick={() => handleSelecionarAno(ano)}
                className={ano === anoSelecionado ? 'selecionado' : ''}
              >
                {ano}
              </button>
            ))}
          </div>
        )}

        <select value={mesSelecionado} onChange={(e) => handleSelecionarMes(e.target.value)}>
          <option value="">Selecione o mês</option>
          {Array.from(new Set(notas.map(nota => nota.dataEmissao.slice(5, 7)))).map(mes => (
            <option key={mes} value={mes}>{mes}</option>
          ))}
        </select>

        <select value={trimestreSelecionado} onChange={(e) => handleSelecionarTrimestre(e.target.value)}>
          <option value="">Selecione o trimestre</option>
          {Array.from(new Set(notas.map(nota => `${nota.dataEmissao.slice(0, 4)}-${Math.ceil(Number(nota.dataEmissao.slice(5, 7)) / 3)}`))).map(trimestre => (
            <option key={trimestre} value={trimestre}>{trimestre}</option>
          ))}
        </select>
      </div>

      <SumaryContainer>
        <div className="defaultBackground">
          <header>
            <p>Notas Emitidas</p>
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalNotasEmitidas)}
          </strong>
        </div>
        <div className="highlight-background">
          <header>
            <p>Notas pagas</p>
            <FaChartLine size={25} />
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalNotasPagas)}
          </strong>
        </div>
        <div className="defaultBackground">
          <header>
            <p>Notas a vencer</p>
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalNotasAVencer)}
          </strong>
        </div>
        <div className="overdueBackground">
          <header>
            <p>Notas vencidas</p>
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalNotasVencidas)}
          </strong>
        </div>
        <div className="defaultBackground">
          <header>
            <p>Notas emitidas sem cobrança</p>
          </header>
          <strong>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalNotasSemCobranca)}
          </strong>
        </div>

      </SumaryContainer>
      <ChartContainer>
        <div>
          <span>Receita recebida</span>
          <Chart options={options} series={series} type="bar" height={250} width={700} />
        </div>
        <div>
          <span>Inadimplência</span>
          <Chart options={optionsInadimplencia} series={seriesInadimplencia} type="area" height={250} width={700} />
        </div>
      </ChartContainer>
      <NotesContainer>
        <h2>Lista de Notas Emitidas</h2>
        <table>
          <thead>
            <tr>
              <th>Nome do Pagador</th>
              <th>Número da Nota</th>
              <th>
                Data de Emissão
                <select value={filtroMesEmissao} onChange={(e) => setFiltroMesEmissao(e.target.value)}>
                  <option value="">Todos</option>
                  {mesesEmissaoDisponiveis.map(mes => (
                    <option key={mes} value={mes}>{mes}</option>
                  ))}
                </select>
              </th>
              <th>
                Data da Cobrança
                <select value={filtroMesCobranca} onChange={(e) => setFiltroMesCobranca(e.target.value)}>
                  <option value="">Todos</option>
                  {mesesCobrancaDisponiveis.map(mes => (
                    <option key={mes} value={mes}>{mes}</option>
                  ))}
                </select>
              </th>
              <th>
                Data do Pagamento
                <select value={filtroMesPagamento} onChange={(e) => setFiltroMesPagamento(e.target.value)}>
                  <option value="">Todos</option>
                  {mesesPagamentoDisponiveis.map(mes => (
                    <option key={mes} value={mes}>{mes}</option>
                  ))}
                </select>
              </th>
              <th>Valor da Nota</th>
              <th>
                Status
                <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                  <option value="">Todos</option>
                  {statusDisponiveis.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {notasFiltradas.map(nota => (
              <tr key={nota.numeroNota}>
                <td>{nota.pagador}</td>
                <td>{nota.numeroNota}</td>
                <td>{nota.dataEmissao}</td>
                <td>{nota.dataCobranca}</td>
                <td>{nota.dataPagamento}</td>
                <td>{nota.valorNota}</td>
                <td>{nota.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </NotesContainer>
    </Container>
  );
}
