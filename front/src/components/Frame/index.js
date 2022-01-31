import './index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader


function Frame(props) {
    return (
        <div className="boxFrame">
            <div className="itemFrame">
                <div className="frame">
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default Frame;
