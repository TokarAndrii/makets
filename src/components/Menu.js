import React, {Component} from 'react'
import MenuItem from './MenuItem/MenuItem'
import Filter from './shared/Filter/Filter'


export default class Menu extends Component {
    static defaultProps = {
        menuList: []
    }

    render() {
        const {menuList, className, filter,onFilterChange} = this.props
        return (
            <div>
                <div style={{width: "100%", height: "60px", lineHeight: "60px"}}>
                    <Filter placeholder="type to sort by name" filter={filter} onFilterChange={onFilterChange}/>
                </div>
                <div className={className}>
                    {menuList.map(menuListItem => (
                        <MenuItem key={menuListItem.id} imageUrl={menuListItem.image}
                                  itemDescription={menuListItem.description}
                                  itemName={menuListItem.name} itemPrice={menuListItem.price}
                                  itemIngredients={menuListItem.ingredients}>

                        </MenuItem>)
                    )}
                </div>
            </div>

        )
    }
}

