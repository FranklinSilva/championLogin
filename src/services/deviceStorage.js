import  AsyncStorage  from '@react-native-community/async-storage';

const deviceStorage = {
    async saveItem(key, value) {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async loadCurrentUser() {
        try {
          const value = await AsyncStorage.getItem('champion');
          if (value !== null) {
            return value;
          } else {
            return ''
          }
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async loadAccessToken() {
        try {
          const value = await AsyncStorage.getItem('id_token');
          if (value !== null) {
            return value;
          } else {
            return ''
          }
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },
      
      async deleteAccessToken() {
        try{
          await AsyncStorage.removeItem('id_token')
          .then(
            () => {
              return '';
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async deleteItem(id) {
        try{
          await AsyncStorage.removeItem(id)
          .then(
            () => {
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async getItem(itemId) {
        try {
          const value = await AsyncStorage.getItem(itemId);
            return value;
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async getLocalStore(items) {
        try {
          var store = {};
          /*items.map(async e => {
            const value = await AsyncStorage.getItem(e);
            if(!!value)
              store.push(value);
          })
*/
          for(i=0; i < items.length; i++){
            const value = await AsyncStorage.getItem(items[i]);
            if(!!value)
              store[items[i]] = value;
            else
              store[items[i]] = {};

          }
          console.log(store)
          return store;
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },

      async clearStorage(){
        try{
          await AsyncStorage.clear()
          .then(
            () => {
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }
};

export default deviceStorage;