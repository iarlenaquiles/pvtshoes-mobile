import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList } from 'react-native-gesture-handler';
import * as CartActions from '../../store/modules/cart/actions.js';

import {
  Container,
  ContainerCart,
  ProdImg,
  ContainerProd,
  ProdDetails,
  ProdTitle,
  ProdPrice,
  ProdControls,
  StockCtrl,
  ProductControlButton,
  ProductAmount,
  SubTotal,
  Separator,
  ContainerProdF1,
  MsgEmpty,
  ContainerTotal,
  Total,
  FinishBtn,
  FinishBtnText,
} from './styles';
import { formatPrice } from '../../utils/format.js';

export default function Cart() {
  const products = useSelector(state =>
    state.cart.map(prod => ({
      ...prod,
      subtotal: formatPrice(prod.price * prod.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (total, product) => total + product.price * product.amount,
        0
      )
    )
  );

  const dispatch = useDispatch();
  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function handleRemoveProduct(id) {
    dispatch(CartActions.removeItem(id));
  }

  function renderCartList({ item }) {
    return (
      <>
        <ContainerProd>
          <ContainerProdF1>
            <ProdImg source={{ uri: item.image }} title={item.title} />
            <ProdDetails>
              <ProdTitle>{item.title}</ProdTitle>
              <ProdPrice>{item.priceFormatted}</ProdPrice>
            </ProdDetails>
            <ProductControlButton onPress={() => handleRemoveProduct(item.id)}>
              <Icon name="delete-forever" size={24} color="#7159c1" />
            </ProductControlButton>
          </ContainerProdF1>
          <ProdControls>
            <StockCtrl>
              <ProductControlButton onPress={() => decrement(item)}>
                <Icon name="remove-circle-outline" size={20} color="#7159c1" />
              </ProductControlButton>
              <ProductAmount value={String(item.amount)} />
              <ProductControlButton onPress={() => increment(item)}>
                <Icon name="add-circle-outline" size={20} color="#7159c1" />
              </ProductControlButton>
            </StockCtrl>

            <SubTotal>{item.subtotal}</SubTotal>
          </ProdControls>
        </ContainerProd>
        <Separator />
      </>
    );
  }

  return (
    <>
      <ContainerTotal>
        <Total>Total: {total}</Total>
        <FinishBtn>
          <FinishBtnText>
            Finish order <Icon name="check" color="#FFF" size={15} />
          </FinishBtnText>
        </FinishBtn>
      </ContainerTotal>
      <Container>
        <ContainerCart>
          {products.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={products}
              renderItem={renderCartList}
              keyExtractor={item => item.id}
            />
          ) : (
            <MsgEmpty>Your cart is empty.</MsgEmpty>
          )}
        </ContainerCart>
      </Container>
    </>
  );
}
