import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import retourIcon from "../../Outils/icon/retour.ico";
import aina from "../../Outils/icon/aina.png";
import addPersIcon from "../../Outils/icon/plus.ico";
import "./prisonniersPage.css"

function PrisonniersPage() {

    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        const fetchData=async ()=>{ 
            await axios.get(`http://localhost:5000/metreAjourStatut`);
            let resultat = await axios.get(`http://localhost:5000/detenus`)    
            resultat = await resultat.data;
            setData(resultat)
        }
        fetchData()
    }, [])

    return (
        <div className='corpsPersonnel'>
            <div className="gauchePrisonnier">
                <div className="coucheGauche">
                    <div className="titreConge">
                        <p>Détenus</p>
                    </div>
                    <div className="rechercherDiv">
                        <input type="text"  value={searchValue}
                                onChange={handleSearchChange}  placeholder='Rechercher...'/>
                    </div>
                    <Link to={"/"}>
                        <div className="contenue">
                            <img className='image' src={retourIcon}/>
                            <p>Retour</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="droitePrisonniers">
                <div className="coucheConge">

                    {
                        data
                        .filter(item =>
                            Object.values(item).some(value =>
                            String(value).toLowerCase().includes(searchValue.toLowerCase())
                            )
                        ).map((item, index) =>                 
                            <div key={index} className="contenuePrisonnier">
                                <div className="imagePrisonnier">
                                    <img src={`http://localhost:5000/images/${item.image}`} className={item.statut === 2 ? 'exited-image' : ''}/>
                                    {item.statut === 2 && <p className="exit-message">Sorti de la prison</p>}
                                    {item.statut === 3 && <p className="exit-messageD">Décédé</p>}
                                    {item.statut === 4 && <p className="exit-messageE">Evasion</p>}
                                </div>
                                <div className="titrePrisonnier">
                                    <div className="divHorizontal">
                                        <p>{item.nom}</p>
                                        <h5>{item.dateVenue.substring(0, 10)}</h5>
                                    </div>
                                    <hr className='hr' />
                                    <h6>{item.adresse}</h6>
                                </div>
                                <div className="buttonPrisonnier">
                                    <Link to={`/detailsDetenus/${item.id}`}>
                                        <button className='buttonIray'>Voir profil</button>
                                    </Link>
                                </div>
                            </div>
                    )
                    }


                    <Link to={'/addDetenus'}>
                        <div className="contenueAdd">
                            <div className="icon">
                                <img src={addPersIcon}/>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default PrisonniersPage