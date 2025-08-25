import { ResponsiveTreeMap } from '@nivo/treemap';

interface TreeMapData {
  name: string;
  value: number;
}

interface CategoryTreeMapProps {
  data: TreeMapData[];
}

const CategoryTreeMap: React.FC<CategoryTreeMapProps> = ({ data }) => {
  const formattedData = {
    name: 'categories',
    children: data.map(item => ({
      name: item.name,
      value: item.value,
      loc: item.value
    }))
  };

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveTreeMap
        data={formattedData}
        identity="name"
        value="loc"
        valueFormat=".0f"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.2]]
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
          from: 'color',
          modifiers: [['darker', 2]]
        }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.1]]
        }}
        colors={['#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F']}
      />
    </div>
  );
};

export default CategoryTreeMap;
