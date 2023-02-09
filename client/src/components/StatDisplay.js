

const StatDisplay = ({stat_name, object_stat, header=false}) => {

    if (header) {
        return (
            <div className="stat-display">
                <h3>
                    <span>{object_stat}</span>
                </h3>
            </div>
        )

    } else {
        return (
            <div className="stat-display bio">
                <span>{object_stat}</span>
            </div>
    )
    }
}

export default StatDisplay