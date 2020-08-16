import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    myStocks: [],
    filteredStocks: [],
    alphaSort: false,
    moneySort: false
  }

  componentDidMount() {
    this.getStocks()
  }

  getStocks = () => {
      fetch('http://localhost:3000/stocks')
      .then(res=> res.json())
      .then(stocks => {
       let filteredStocks = stocks.filter(stock => stock.type === 'Tech')
        this.setState({stocks, filteredStocks})
      })
    }

    buyStock = (stock) => {
      
      this.setState({myStocks: [...this.state.myStocks, stock]})
    }

    sellStock = (stock) => {
      let myStocks = this.state.myStocks.filter(astock => astock.id !== stock.id)
      this.setState({
        myStocks
      })
    }

    filterStock = ( event) => {
        let filteredStocks = this.state.stocks.filter(stock => stock.type === event.target.value)
        this.setState({filteredStocks})
    }

    nameSort = () => {
      
      let filteredStocks = this.state.filteredStocks.sort((a,b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0
      })
      this.setState({filteredStocks, alphaSort: true, moneySort: false})
    }

    priceSort = () => {
      let filteredStocks = this.state.filteredStocks.sort((a,b) => {
        let priceA = a.price;
        let priceB = b.price;
        if (priceA < priceB) {
          return -1;
        }
        if (priceB > priceA) {
          return 1;
        }
        return 0
      })
      this.setState({filteredStocks, alphaSort: false, moneySort: true})
    }

  render() {
    return (
      <div>
        <SearchBar alphaSort={this.state.alphaSort} moneySort={this.state.moneySort} nameSort={this.nameSort} priceSort={this.priceSort} filterStock={this.filterStock}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.filteredStocks} handleClick={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer handleClick={this.sellStock} myStocks={this.state.myStocks}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
