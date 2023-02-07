

const StatDisplay = ({stat_name, object_stat}) => {
    return (
        <div className="stat-display">
            <p>{stat_name}: {object_stat}</p>
        </div>
    )
}

export default StatDisplay