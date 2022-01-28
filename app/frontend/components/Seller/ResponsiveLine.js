import { ResponsiveLine } from '@nivo/line'
export default function Line({ data }) {
    return <ResponsiveLine
        margin={{ top: 25, right: 25, bottom: 25, left: 60 }}
        data={data}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisLeft={{
            tickSize: 2,
            tickPadding: 4,
            tickRotation: 0,
            legendOffset: 0,
            legendPosition: 'middle'
        }}
        axisBottom={{
            orient: 'bottom',
            tickSize: 2,
            tickPadding: 5
        }}
        colors={{ scheme: 'nivo' }}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-21}
        useMesh={true}
    />
}