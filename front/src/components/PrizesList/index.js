import './index.css';
function PrizesList() {
    return (
            <div className="boxPrizesList">
                <div className="titlePrizesList">
                    <div className="frameTitlePrizesList">
                       <p>Liste des lots</p>
                    </div>
                </div>
                <div className="prizesList">
                    <div className="prizesListFirst">
                        <div className="prizesListItem">
                            <p>1 |</p>
                            <img className="itemImg" src="https://www.kusmitea.com/on/demandware.static/-/Sites-masterCatalog_Kusmi/default/dw2b1f111e/images/3/c/8/0/3c80f81b8e6499756b81bbecdd99e052f5c7b3dc_21685A1070.png"></img>
                            <p className="itemDescription">Infuseur de thé</p>
                        </div>
                        <div className="prizesListItem">
                            <p>2 |</p>
                            <img className="itemImg" src="https://www.kusmitea.com/on/demandware.static/-/Sites-masterCatalog_Kusmi/default/dw2b1f111e/images/3/c/8/0/3c80f81b8e6499756b81bbecdd99e052f5c7b3dc_21685A1070.png"></img>
                            <p className="itemDescription"> Boite de <span className="greenFont">100g</span> d’un thé détox ou d’infusion</p>
                        </div>
                        <div className="prizesListItem">
                            <p>3 |</p>
                            <img className="itemImg" src="https://www.kusmitea.com/on/demandware.static/-/Sites-masterCatalog_Kusmi/default/dw2b1f111e/images/3/c/8/0/3c80f81b8e6499756b81bbecdd99e052f5c7b3dc_21685A1070.png"></img>
                            <p className="itemDescription">Boite de <span className="greenFont">100g</span> d’un thé signature</p>
                        </div>
                    </div>
                    <div className="prizesListSecond">
                        <div className="prizesListItem">
                            <p>4 |</p>
                            <img className="itemImg" src="https://www.kusmitea.com/on/demandware.static/-/Sites-masterCatalog_Kusmi/default/dw2b1f111e/images/3/c/8/0/3c80f81b8e6499756b81bbecdd99e052f5c7b3dc_21685A1070.png"></img>
                            <p className="itemDescription">Coffret découverte d’une valeur de <span className="greenFont">39€</span></p>
                        </div>
                        <div className="prizesListItem">
                            <p>5 |</p>
                            <img className="itemImg" src="https://www.kusmitea.com/on/demandware.static/-/Sites-masterCatalog_Kusmi/default/dw2b1f111e/images/3/c/8/0/3c80f81b8e6499756b81bbecdd99e052f5c7b3dc_21685A1070.png"></img>
                            <p className="itemDescription">Coffret découverte d’une valeur de <span className="greenFont">69€</span></p>
                        </div>
                        <div className="prizesListItem">
                            <p>6 |</p>
                            <img className="itemImg" src="https://www.kusmitea.com/on/demandware.static/-/Sites-masterCatalog_Kusmi/default/dw2b1f111e/images/3/c/8/0/3c80f81b8e6499756b81bbecdd99e052f5c7b3dc_21685A1070.png"></img>
                            <p className="itemDescription">1 an de thé d'une valeur de <span className="greenFont">360€</span></p>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default PrizesList;
